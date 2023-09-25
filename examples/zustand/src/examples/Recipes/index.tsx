import { useCallback, useEffect, useState } from "react";
import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

interface UseStoreCustom {
  count: number;
  handleChange: () => void;
}

const useStoreCustom = create(
  subscribeWithSelector<UseStoreCustom>((set, get) => ({
    count: 0,
    handleChange: () => {
      console.log("call");

      set({ count: ++get().count });
    },
  }))
);

const Store = () => {
  const [isEmpty, setIsEmpty] = useState(true);

  const listener = useCallback((currentState: number, prevState: number) => {
    console.log(currentState, prevState);

    if (currentState < 5 && prevState >= 5) return setIsEmpty(true);
    if (currentState >= 5 && prevState < 5) return setIsEmpty(false);
  }, []);

  const selector = useCallback((s: UseStoreCustom): number => s.count, []);

  const unsub = useStoreCustom.subscribe<number>(selector, listener);

  useEffect(() => unsub, [unsub]);

  return isEmpty ? "Opp" : "hihi";
};

const Recipes = () => {
  const { handleChange } = useStoreCustom();

  return (
    <>
      <h2>Recipes</h2>
      <h3>Subscribe</h3>
      <Store />
      <button onClick={handleChange}>useStoreCustom</button>
    </>
  );
};

export default Recipes;
