import { useStore } from "zustand";
import { useUserCreate, useUserCreateStore } from "./store";
import { App2 } from "./StoreProvider";

const InitStateWithProps = () => {
  const a = useUserCreate();
  const b = useStore(useUserCreateStore);
  console.log("With Create: ", a);
  console.log("With CreateStore", b);

  return <App2 />;
};

export default InitStateWithProps;
