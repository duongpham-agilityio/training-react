import { WithImmer } from "./WithImmer";
import { WithNormal } from "./WithNormal";

const UpdateState = () => (
  <>
    <WithNormal />
    <WithImmer />
  </>
);

export default UpdateState;
