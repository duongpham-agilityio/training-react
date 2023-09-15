/* eslint-disable no-unused-vars */

// Time hide toast or cart
export const DEFAULT_DURATION = 1500;

// Time send request when stop change input
export const TIMEOUT_DEBOUNCE = 600;

// Min price products
export const MIN_RANGE = 100;

// Max price products
export const MAX_RANGE = 1000;

// Quantity records
export const RECORD = 7;

// Default first page
export const FIRST_PAGE = 1;

// Action dispatch
export enum APP_ACTION {
  SET_IS_LOADING = 'loading',
  SET_TOAST = 'toast',
  SET_PRODUCT = 'set_product',
  ADD_TO_CART = 'add_to_cart',
  REMOVE_FROM_CART = 'remove_from_cart',
  REMOVE_ALL_FROM_CART = 'remove_all_from_cart',
}

// Endpoint url
export enum END_POINT {
  HOME = '/',
  PRODUCTS = 'products',
  PRODUCT = 'products/:param',
  ERROR = '*',
}

// LocalStorage key
export enum STORE_KEY {
  CARTS = 'carts',
}
