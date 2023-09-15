// Context
import { Action, GlobalState } from 'contexts/App/context';

// Types
import { TypeToast } from 'components/Toast';

// Constants
import { APP_ACTION } from '@constants';

export const reducer = (state: GlobalState, action: Action): GlobalState => {
  switch (action.type) {
    case APP_ACTION.ADD_TO_CART: {
      return {
        ...state,
        cartSize: state.cartSize + 1,
      };
    }

    case APP_ACTION.REMOVE_FROM_CART: {
      return {
        ...state,
        cartSize: state.cartSize - 1,
      };
    }

    case APP_ACTION.REMOVE_ALL_FROM_CART: {
      return {
        ...state,
        cartSize: 0,
      };
    }

    case APP_ACTION.SET_TOAST: {
      return {
        ...state,
        toast: action.payload as unknown as TypeToast,
      };
    }

    default:
      return state;
  }
};
