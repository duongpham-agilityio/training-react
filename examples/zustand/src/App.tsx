// Components
import { GetStarted } from "./examples";
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
    </main>
  );
};

export default App;
