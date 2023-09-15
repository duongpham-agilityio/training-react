import { createContext } from 'react';

// Types
import { TypeToast } from 'components/Toast';
import { Product } from 'types';

export type GlobalState = {
  cartSize: number;
  toast: TypeToast;
};

export type Action = {
  type: string;
  payload?: boolean | number | TypeToast | Product;
};

// eslint-disable-next-line no-unused-vars
export type Dispatch = (action: Action) => void;

const initContext: GlobalState = {
  cartSize: 0,
  toast: {
    type: 'success',
    message: '',
    timeout: 3000,
  },
};

const defaultDispatch: Dispatch = () => {};

export const AppContext = createContext<{
  globalState: GlobalState;
  dispatch: Dispatch;
}>({
  globalState: initContext,
  dispatch: defaultDispatch,
});
