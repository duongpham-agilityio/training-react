import { MouseEvent, useMemo, useState } from 'react';
import { useCart, useFetch } from 'hooks';
import { useOutletContext, useSearchParams } from 'react-router-dom';
import { withErrorBoundary } from 'react-error-boundary';

// Components
import {
  Filter,
  Card,
  Grid,
  Heading,
  ErrorFallback,
  Loading,
} from 'components';
import { Button } from 'components/commons';

// Constants
import { END_POINT, FIRST_PAGE, MAX_RANGE, RECORD } from '@constants';

// Types
import { CartType, Product } from 'types';
import { FilterType } from 'components/Filter';

// Styles
import homeStyles from './home.module.css';

// initialize filter
const defaultFilter = {
  brand: '',
  sortBy: '1',
  rangePrice: `${MAX_RANGE}`,
};

const HomePage = () => {
  const { data, isLoading, error } = useFetch<Product[]>(END_POINT.PRODUCTS);
  const { addProductToCart } = useCart();
  const [filter, setFilter] = useState<FilterType>(defaultFilter);
  const [searchParams, setSearchParams] = useSearchParams();
  const { isShowFilter, onCloseFilter } = useOutletContext<{
    isShowFilter: boolean;
    onCloseFilter: () => void;
  }>();

  //---------------- Calculating data ----------------

  /**
   * Get value search parameters
   */
  const param = useMemo(() => {
    const param = {
      page: searchParams.get('page') || '1',
      name: searchParams.get('name') || '',
    };

    return param;
  }, [searchParams]);

  /**
   * Filter products
   */
  const filters = useMemo(() => {
    const filters = data?.filter(({ category, price, title }) => {
      const condition =
        category.toLowerCase().includes(filter.brand.toLowerCase()) &&
        price <= parseInt(filter.rangePrice) &&
        title.toLowerCase().includes(param.name.toLowerCase() || '');

      return condition;
    });

    filters?.sort(() => parseInt(filter.sortBy));

    return filters;
  }, [filter, param, data]);

  /**
   * Calculate the number of pages to display
   */
  const pagination = useMemo(() => {
    const filtersLength = filters?.length || 0;
    const isSizePage = filtersLength % RECORD;
    const sizePage = Math.floor(filtersLength / RECORD);

    if (!isSizePage) {
      return new Array(sizePage).fill(0);
    }

    return new Array(sizePage + 1).fill(0);
  }, [filters]);

  /**
   * Get products by page
   */
  const products = useMemo(() => {
    const products = filters?.filter((_, index) => {
      const isStartIndex = index >= (parseInt(param.page) - 1) * RECORD;
      const isEndIndex = index < parseInt(param.page) * RECORD;
      const condition = isStartIndex && isEndIndex;

      return condition;
    });

    return products;
  }, [param, filters]);

  //---------------- Handlers ----------------

  /**
   * Update filter to original value
   */
  const resetFilter = () => {
    setFilter(defaultFilter);
  };

  /**
   * Go to the next page or go back one page
   * @param step next or back
   */
  const changePageByStep = (step: 1 | -1) => {
    setSearchParams({
      ...searchParams,
      page: `${parseInt(param.page) + step}`,
    });
  };

  /**
   * Go to the page you want to see
   * @param page Pages to see
   */
  const changePageByValue = (page: number) => {
    setSearchParams({
      ...searchParams,
      page: `${page}`,
    });
  };

  //---------------- Render components ----------------

  if (isLoading) return <Loading />;

  if (error) {
    return <ErrorFallback error={error} resetErrorBoundary={() => {}} />;
  }

  /* Show when empty products */
  if (!products.length) {
    return (
      <Heading
        description="Empty products."
        size="lg"
        style={{
          textAlign: 'center',
        }}
      />
    );
  }

  return (
    <>
      <Grid col={7} row={1}>
        {products &&
          products.map((product) => {
            return (
              <Card
                href={`${END_POINT.PRODUCTS}/${product.id}`}
                category={product.category}
                price={product.price}
                title={product.title}
                imageURL={product.imageURL}
                key={product.id}
                onClick={(e: MouseEvent) => {
                  const data: Omit<CartType, 'quantity'> = {
                    id: product.id,
                    title: product.title,
                    imageURL: product.imageURL,
                    price: product.price,
                    category: product.category,
                  };

                  e.preventDefault();
                  addProductToCart(data, 1, product.quantity);
                }}
              />
            );
          })}
      </Grid>

      {/*  Pagination  */}
      <div className={homeStyles.pagination}>
        <Button
          className={homeStyles.btnPagination}
          description="prev"
          disabled={parseInt(param.page) === FIRST_PAGE}
          onClick={() => changePageByStep(-1)}
        />
        {pagination.map((_, index) => {
          const page = index + 1;
          const currentPage = parseInt(param.page);

          return (
            <Button
              key={index}
              className={homeStyles.btnPagination}
              description={`${page}`}
              variant={currentPage === page ? 'primary' : 'default'}
              disabled={currentPage === page}
              onClick={() => changePageByValue(page)}
            />
          );
        })}
        <Button
          className={homeStyles.btnPagination}
          description="next"
          disabled={parseInt(param.page) === pagination.length}
          onClick={() => changePageByStep(1)}
        />
      </div>

      {/* Modal filter */}
      {isShowFilter && (
        <Filter
          filter={filter}
          onFilter={setFilter}
          onReset={resetFilter}
          onCloseFilter={onCloseFilter}
        />
      )}
    </>
  );
};

export default withErrorBoundary(HomePage, {
  FallbackComponent: ErrorFallback,
});
