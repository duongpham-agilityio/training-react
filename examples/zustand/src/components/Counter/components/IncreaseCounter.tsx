import { CountState, useCount } from "../../../stores";

const IncreaseCounter = () => {
  const increase = useCount((state: CountState) => state.increase);
  const decrease = useCount((state: CountState) => state.decrease);

  return (
    <>
      <button onClick={decrease}>Decrease</button>
      <button onClick={increase}>Increase</button>
    </>
  );
};

export default IncreaseCounter;
