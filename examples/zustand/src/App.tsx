// Components
import { GetStarted } from "./examples";
import InitStateWithProps from "./examples/InitStateWithProps";
import Recipes from "./examples/Recipes";
import { SlicePattern } from "./examples/SlicePattern";
import UpdateState from "./examples/UpdateState";

const App = () => {
  return (
    <main
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <GetStarted />
      <UpdateState />
      <SlicePattern />
      <InitStateWithProps />
      <Recipes />
    </main>
  );
};

export default App;
