import { Suspense, useCallback, useState } from 'react';
import {
  Outlet,
  useMatch,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import { useDebounce } from 'hooks';

// Layouts
import Header from 'layouts/Header';

// Components
import { Loading, Cart } from 'components';

// Constants
import { END_POINT } from '@constants';

// Styles
import containerStyles from 'styles/commons/index.module.css';
import defaultStyles from './index.module.css';

const MainLayout = () => {
  const matched = useMatch(END_POINT.HOME);
  const [, setSearchParams] = useSearchParams();
  const [isShowFilter, setIsShowFilter] = useState(false);
  const [isShowCart, setIsShowCart] = useState(false);
  const redirect = useNavigate();

  /**
   * Handle of search data
   */
  const search = useDebounce((value: string) => {
    const isValue = value.trim();

    if (!isValue) {
      redirect(`${END_POINT.HOME}`);

      return;
    }

    if (!matched) {
      return redirect(`${END_POINT.HOME}?name=${isValue}`);
    }

    setSearchParams({ name: isValue });
  });

  /**
   * Toggle filter
   */
  const toggleFilter = useCallback(() => {
    setIsShowFilter((prev) => !prev);
  }, []);

  return (
    <>
      <Header
        onOpenCart={setIsShowCart}
        onOpenFilter={toggleFilter}
        onSearch={search}
        isFilter={Boolean(matched)}
      />
      <main className={`${containerStyles.container} ${defaultStyles.content}`}>
        <Suspense fallback={<Loading />}>
          <Outlet context={{ isShowFilter, onCloseFilter: toggleFilter }} />
          {isShowCart && (
            <Cart isShowCart={isShowCart} onHideCart={setIsShowCart} />
          )}
        </Suspense>
      </main>
    </>
  );
};

export default MainLayout;
