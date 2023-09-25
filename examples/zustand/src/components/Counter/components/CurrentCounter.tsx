import { CountState, useCount } from "../../../stores";

const CurrentCounter = () => {
  const currentCount = useCount((state: CountState) => state.count);

  return <p>Current count: {currentCount}</p>;
};

export default CurrentCounter;
