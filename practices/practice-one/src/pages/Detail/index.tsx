import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCart, useFetch } from 'hooks';
import { FaLongArrowAltDown, FaLongArrowAltUp } from 'react-icons/fa';
import { withErrorBoundary } from 'react-error-boundary';

// Components
import { ErrorFallback, Heading, Loading } from 'components';
import { Button, Input } from 'components/commons';

// Types
import { CartType, Product } from 'types';

// Styles
import detailStyle from './detail.module.css';
import { END_POINT } from '@constants';

const Detail = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useFetch<Product>(
    `${END_POINT.PRODUCTS}/${id}`
  );
  const [quantity, setQuantity] = useState(0);
  const { addProductToCart } = useCart();
  const [currentProduct, setCurrentProduct] = useState<Product>();

  //---------------- Handlers ----------------

  /**
   * Increase or decrease the amount
   * @param step
   */
  const changeQuantity = (step: 1 | -1) => {
    setQuantity((prev) => {
      const isQuantity = prev + step;

      if (isQuantity < 0) {
        return prev;
      }

      return isQuantity;
    });
  };

  /**
   * Add product to cart
   */
  const addProduct = () => {
    const product: Omit<CartType, 'quantity'> = {
      id: Number(data?.id),
      title: String(data?.title),
      imageURL: String(data?.imageURL),
      price: Number(data?.price),
      category: String(data?.category),
    };

    addProductToCart(product, quantity, Number(data?.quantity));
    setQuantity(0);
  };

  useEffect(
    () => setCurrentProduct(data as Product),
    [data, setCurrentProduct]
  );

  //---------------- Render components ----------------

  if (isLoading) return <Loading />;

  if (error) {
    return <ErrorFallback error={error} resetErrorBoundary={() => {}} />;
  }

  return (
    <>
      {currentProduct && (
        <div className={detailStyle.detailWrapper}>
          <div className={detailStyle.imageWrapper}>
            <img
              src={`/${currentProduct?.imageURL}`}
              alt="#"
              className={detailStyle.imageProduct}
            />
          </div>
          <div className={detailStyle.detail}>
            <Heading className={detailStyle.title}>
              <p className={detailStyle.category}>{currentProduct?.category}</p>
              <p className={detailStyle.productName}>{currentProduct?.title}</p>
            </Heading>
            <p className={detailStyle.description}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas nemo
              magnam, iure earum asperiores voluptatum.
            </p>
            <div className={detailStyle.selectQuantity}>
              <Button
                leftIcon={<FaLongArrowAltUp />}
                className={detailStyle.btn}
                onClick={() => changeQuantity(+1)}
              />
              <Input
                type="number"
                className={detailStyle.input}
                customInput={detailStyle.fieldValue}
                value={quantity}
                disabled={true}
              />
              <Button
                leftIcon={<FaLongArrowAltDown />}
                className={detailStyle.btn}
                onClick={() => changeQuantity(-1)}
              />
            </div>
            <p className={detailStyle.stockSize}>
              {currentProduct?.quantity} products left
            </p>
            <p className={detailStyle.price}>${currentProduct?.price}</p>
            <Button
              description="add to basket"
              className={detailStyle.btn}
              size="lg"
              variant="primary"
              onClick={addProduct}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default withErrorBoundary(Detail, {
  FallbackComponent: ErrorFallback,
});
