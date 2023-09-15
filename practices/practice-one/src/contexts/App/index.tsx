import { ReactNode, Reducer, useMemo, useReducer } from 'react';

// Components
import Toast from 'components/Toast';

// Contexts
import { Action, AppContext, GlobalState } from 'contexts/App/context';

// Reducers
import { reducer } from 'reducers';

// Constants
import { DEFAULT_DURATION, STORE_KEY } from '@constants';

type AppProviderProps = {
  children?: ReactNode;
};

const isCarts = localStorage.getItem(STORE_KEY.CARTS);
const initContext: GlobalState = {
  cartSize: isCarts ? JSON.parse(isCarts).length : 0,
  toast: {
    type: 'success',
    message: '',
    timeout: DEFAULT_DURATION,
  },
};

const AppProvider = ({ children }: AppProviderProps) => {
  const [globalState, dispatchAction] = useReducer<
    Reducer<GlobalState, Action>
  >(reducer, initContext);

  const { state, dispatch } = useMemo(
    () => ({
      state: globalState,
      dispatch: dispatchAction,
    }),
    [globalState]
  );

  return (
    <AppContext.Provider value={{ globalState: state, dispatch }}>
      {children}

      <Toast {...globalState.toast} />
    </AppContext.Provider>
  );
};

export default AppProvider;
