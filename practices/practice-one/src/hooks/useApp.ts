import { useCallback, useContext } from 'react';

// Contexts
import { AppContext } from 'contexts/App/context';

// Components
import { TypeToast } from 'components/Toast';

// Constants
import { APP_ACTION, DEFAULT_DURATION } from '@constants';

/**
 * This hook is used to interact with states at the global scope
 * @param {number} timeout Notification hiding time
 * @returns Returns an object containing functions that interact with states
 */
export const useApp = (timeout = DEFAULT_DURATION) => {
  const { globalState, dispatch } = useContext(AppContext);

  /**
   * Dispatch a message
   * @param {Omit<TypeToast, 'timeout'>} payload Noitice to dispatch?
   */
  const onShowToast = useCallback(
    (payload: Omit<TypeToast, 'timeout'>) => {
      dispatch({
        type: APP_ACTION.SET_TOAST,
        payload: {
          ...payload,
          timeout: timeout || globalState.toast.timeout,
        },
      });

      setTimeout(() => {
        dispatch({
          type: APP_ACTION.SET_TOAST,
          payload: {
            type: 'success',
            message: '',
            timeout: timeout || globalState.toast.timeout,
          },
        });
      }, timeout || globalState.toast.timeout);
    },
    [dispatch, timeout, globalState.toast.timeout]
  );

  return {
    globalState,
    onShowToast,
  };
};
