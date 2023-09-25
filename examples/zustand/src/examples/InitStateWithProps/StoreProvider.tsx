import { StoreApi, UseBoundStore, create, createStore } from "zustand";
import { createContext, useRef, useContext } from "react";

interface BearProps {
  bears: number;
}

interface BearState extends BearProps {
  addBear: () => void;
}

type BearStore = ReturnType<typeof createBearStore>;

const createBearStoreCustom: (
  props?: Partial<BearState>
) => UseBoundStore<StoreApi<BearState>> = (props) => {
  const DEFAULT_PROPS: BearProps = {
    bears: 0,
  };

  return create(() => ({
    ...DEFAULT_PROPS,
    ...props,
    addBear: () => console.log(123),
  }));
};

const createBearStore = (initProps?: Partial<BearProps>) => {
  const DEFAULT_PROPS: BearProps = {
    bears: 0,
  };
  return createStore<BearState>()((set) => ({
    ...DEFAULT_PROPS,
    ...initProps,
    addBear: () => set((state) => ({ bears: ++state.bears })),
  }));
};

export const BearContext = createContext<BearStore | null>(null);

type BearProviderProps = React.PropsWithChildren<BearProps>;

function BearProvider({ children, ...props }: BearProviderProps) {
  const storeRef = useRef<BearStore>();
  if (!storeRef.current) {
    storeRef.current = createBearStore(props);
  }
  return (
    <BearContext.Provider value={storeRef.current}>
      {children}
    </BearContext.Provider>
  );
}

function useBearContext<T>(
  selector: (state: BearState) => T
  // equalityFn?: (left: T, right: T) => boolean
): T {
  const store = useContext(BearContext);
  if (!store) throw new Error("Missing BearContext.Provider in the tree");

  const useTemp = createBearStoreCustom({});

  return useTemp(selector);

  // return useStore(store, selector, equalityFn);
}

// Consumer usage of the custom hook
function CommonConsumer() {
  // const temp = createBearStoreCustom({ bears: 1 });
  const bears = useBearContext((s) => s.bears);
  const addBear = useBearContext((s) => s.addBear);
  return (
    <>
      <div>
        {bears} Bears. <br />
        {/* Create: {temp.getState().bears} */}
      </div>
      <button onClick={addBear}>Add bear</button>
    </>
  );
}

export const App2 = () => {
  return (
    <BearProvider bears={2}>
      <CommonConsumer />
    </BearProvider>
  );
};
