import { useCallback, useContext } from 'react';
import { useApp, useStore } from 'hooks';
import { AxiosError } from 'axios';

// Contexts
import { AppContext } from 'contexts/App/context';

// Constants
import { APP_ACTION, END_POINT, MESSAGES, STORE_KEY } from '@constants';

// Helpers
import { axiosConfig } from 'helpers';

// Types
import { CartType } from 'types';

/**
 * This hook manages interactions with the shopping cart
 * @returns Ways to interact with the shopping cart
 */
export const useCart = () => {
  const { dispatch } = useContext(AppContext);
  const { onShowToast } = useApp();
  const store = useStore();

  /**
   * Get all the products in the store
   */
  const getProductFromCart = useCallback((): CartType[] => {
    try {
      const result = store.get<CartType[]>('carts');

      return result || [];
    } catch (error) {
      const { message } = error as AxiosError;

      onShowToast({
        message,
        type: 'error',
        display: 'visible',
      });
    }

    return [];
  }, [store, onShowToast]);

  /**
   * Add product to cart
   * @param {Product} product product
   * @param {number} quantity Extra quantity
   * @param {number} stock Quantity in stock
   */
  const addProductToCart = useCallback(
    (product: Omit<CartType, 'quantity'>, quantity: number, stock: number) => {
      if (quantity > stock) {
        return onShowToast({
          message: MESSAGES.INSUFFICIENT_STOCK,
          type: 'error',
          display: 'visible',
        });
      }

      if (!quantity) {
        return onShowToast({
          message: MESSAGES.INVALID_QUANTITY,
          type: 'error',
          display: 'visible',
        });
      }

      try {
        const result = getProductFromCart() || [];
        const isProduct = result.find((item) => item.id === product.id);
        let carts: CartType[] = [];

        if (!isProduct) {
          carts = [...result, { ...product, quantity }];

          dispatch({
            type: APP_ACTION.ADD_TO_CART,
          });
        } else {
          isProduct.quantity = isProduct.quantity + quantity;
          carts = [...result];
        }

        store.set<CartType[]>('carts', carts);
        onShowToast({
          message: MESSAGES.ADD_SUCCESS,
          type: 'success',
          display: 'visible',
        });
      } catch (error) {
        onShowToast({
          message: MESSAGES.ERROR,
          type: 'error',
          display: 'visible',
        });
      }
    },
    [store, getProductFromCart, onShowToast, dispatch]
  );

  /**
   * Handle remove one product from cart
   * @param {number} id  Id product
   */
  const removeOne = useCallback(
    (id: number) => {
      try {
        const carts = getProductFromCart() || [];
        const result = carts.filter((item) => item.id !== id);

        store.set<CartType[]>('carts', result);
        onShowToast({
          message: MESSAGES.DELETE,
          type: 'success',
          display: 'visible',
        });
        dispatch({
          type: APP_ACTION.REMOVE_FROM_CART,
        });
      } catch (error) {
        const { message } = error as AxiosError;

        onShowToast({
          message,
          type: 'error',
          display: 'visible',
        });
      }
    },
    [store, dispatch, onShowToast, getProductFromCart]
  );

  /**
   * Handle remove all product from cart
   */
  const removeAll = useCallback(() => {
    store.remove(STORE_KEY.CARTS);
    onShowToast({
      message: MESSAGES.DELETE,
      type: 'success',
      display: 'visible',
    });
    dispatch({
      type: APP_ACTION.REMOVE_ALL_FROM_CART,
    });
  }, [store, dispatch, onShowToast]);

  /**
   * Handle payment
   */
  const payment = useCallback(
    // eslint-disable-next-line no-unused-vars
    async (id: number, callback: (product: CartType) => void) => {
      try {
        const carts: CartType[] = store.get<CartType[]>(STORE_KEY.CARTS) || [];
        const currentProduct = carts.find((product) => product.id === id);

        if (currentProduct) {
          callback(currentProduct);
        }

        const getProducts = () => {
          return carts.map((cart) => {
            return axiosConfig.get(`${END_POINT.PRODUCTS}/${cart.id}`);
          });
        };

        Promise.all(getProducts())
          .then((responses) => {
            return responses.map((res) => res.data);
          })
          .then((products) => {
            products.map((product, index) => {
              return axiosConfig.patch(`${END_POINT.PRODUCTS}/${product.id}`, {
                quantity: product.quantity - carts[index].quantity,
              });
            });
          });

        store.remove(STORE_KEY.CARTS);
        dispatch({
          type: APP_ACTION.REMOVE_ALL_FROM_CART,
        });
        onShowToast({
          message: MESSAGES.PAYMENT,
          type: 'success',
          display: 'visible',
        });
      } catch (error) {
        const { message } = error as AxiosError;

        onShowToast({
          message,
          type: 'error',
          display: 'visible',
        });
      }
    },
    [store, dispatch, onShowToast]
  );

  return {
    addProductToCart,
    getProductFromCart,
    removeOne,
    removeAll,
    payment,
  };
};
