import {
  MouseEvent,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useCart, useFetch } from 'hooks';
import { FaTimes } from 'react-icons/fa';
import { useParams } from 'react-router-dom';

// Components
import { ErrorFallback, Heading, Loading } from 'components';
import { Button } from 'components/commons';

// Styles
import styles from './cart.module.css';
import { DEFAULT_DURATION, END_POINT } from '@constants';
import { withErrorBoundary } from 'react-error-boundary';
import { Product } from 'types';

type CartProps = {
  isShowCart: boolean;
  // eslint-disable-next-line no-unused-vars
  onHideCart: (isShowCart: boolean) => void;
};

const Cart = (props: CartProps) => {
  const { isShowCart, onHideCart } = props;
  const { id } = useParams();
  const {
    data: product,
    isLoading,
    error,
    mutate,
  } = useFetch<Product>(id ? `${END_POINT.PRODUCTS}/${id}` : null);
  const { getProductFromCart, removeAll, removeOne, payment } = useCart();
  const cartRef = useRef<HTMLDivElement>(null);
  const [data, setData] = useState(getProductFromCart() || []);

  //---------------- Calculating data ----------------

  const total = useMemo(() => {
    const total = data.reduce((prev, current) => {
      return prev + current.price * current.quantity;
    }, 0);

    return total;
  }, [data]);

  //---------------- Handlers ----------------

  /**
   * Calculate total amount
   */
  const bindCloseCart = useCallback(() => {
    const cartElement = cartRef.current;

    cartElement?.classList.remove(styles.open);
    cartElement?.classList.add(styles.close);

    setTimeout(() => onHideCart(false), DEFAULT_DURATION);
  }, [onHideCart]);

  /**
   * Remove one product in cart
   * @param id id of product
   */
  const handleRemoveOne = (id: number) => {
    const carts = data.filter((cart) => cart.id !== id);

    setData(carts);
    removeOne(id);
  };

  /**
   *  Clear all products in cart
   */
  const clearCart = () => {
    setData([]);
    removeAll();
  };

  const handlePayment = async () => {
    setData([]);
    if (product) {
      payment(product.id, (productWithStore) => {
        const quantityCurrentProduct = productWithStore?.quantity || 0;
        const newData = {
          ...product,
          quantity: product.quantity - quantityCurrentProduct,
        };

        mutate(newData, {
          populateCache: (newData) => newData,
          revalidate: false,
        });
      });
    }
  };

  useEffect(() => {
    document.addEventListener('click', bindCloseCart);

    return () => document.removeEventListener('click', bindCloseCart);
  }, [bindCloseCart]);

  if (isLoading) return <Loading />;

  if (error) {
    return <ErrorFallback error={error} resetErrorBoundary={() => {}} />;
  }

  return (
    <>
      {/* add class 'open' or 'close */}
      <section
        ref={cartRef}
        className={`${styles.cartWrapper} ${
          isShowCart ? styles.open : styles.close
        }`}
        onClick={(e: MouseEvent) => e.stopPropagation()}
      >
        <div className={styles.cartHeder}>
          <Heading>
            <span className={styles.cartTitle}>My Basket</span>
            <span className={styles.cartQuantity}>{`( ${data?.length} item${
              // eslint-disable-next-line no-constant-condition
              data && data.length > 1 ? 's' : ''
            })`}</span>
          </Heading>

          <div className={styles.cardHeaderActions}>
            <Button
              description="Close"
              variant="primary"
              size="sm"
              className={styles.btn}
              onClick={bindCloseCart}
            />
            <Button
              description="Clear Basket"
              size="sm"
              className={styles.btn}
              onClick={clearCart}
              variant={data.length ? 'primary' : 'default'}
              disabled={!data.length}
            />
          </div>
        </div>

        <div className={styles.cartBody}>
          {data.map(({ id, imageURL, title, quantity, price }) => {
            return (
              <div className={styles.cartItem} key={id}>
                <img
                  src={`/${imageURL}`}
                  alt={title}
                  className={styles.cartImage}
                />
                <div className={styles.cartInformation}>
                  <Heading description={title} className={styles.productName} />
                  <div className={styles.cartDetails}>
                    <div className={styles.detailItem}>
                      <Heading
                        tag="h3"
                        description="Quantity"
                        className={styles.detailHeading}
                      />
                      <p className={styles.detailValue}>{quantity}</p>
                    </div>
                    <div className={styles.detailItem}>
                      <Heading
                        tag="h3"
                        description="Size"
                        className={styles.detailHeading}
                      />
                      <p className={styles.detailValue}>28 mm</p>
                    </div>
                  </div>
                </div>
                <p className={styles.productPrice}>${price}</p>
                <div className={styles.cartItemActions}>
                  <Button
                    leftIcon={<FaTimes />}
                    size="sm"
                    className={styles.btn}
                    onClick={() => handleRemoveOne(id)}
                  />
                </div>
              </div>
            );
          })}
        </div>

        <div className={styles.cartFooter}>
          <div className={styles.cartTotal}>
            <p className={styles.totalText}>Subtotal Amout:</p>
            <p className={styles.total}>${total}</p>
          </div>
          <Button
            description="check out"
            className={styles.btn}
            size="lg"
            variant={data.length ? 'primary' : 'default'}
            disabled={!data.length}
            onClick={handlePayment}
          />
        </div>
      </section>
    </>
  );
};

export default withErrorBoundary(memo(Cart), {
  FallbackComponent: ErrorFallback,
});
