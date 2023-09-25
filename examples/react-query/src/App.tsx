import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Components
// import FirstStep from "./examples/FirstStep";
// import TypeScript from "./examples/Typescript";
// import Queries from "./examples/Queries";
// import QueryFunction from "./examples/QueryFunction";
// import Paginated from "./examples/Paginated";
// import StaleTime from "./examples/StaleTime";
// import InfiniteQuery from "./examples/InfiniteQuery";
import Mutation from "./examples/Mutation";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    {/* <FirstStep />
    <TypeScript />
    <Queries />
    <QueryFunction />
    <Paginated />
    <StaleTime />
    <InfiniteQuery /> */}
    <Mutation />
  </QueryClientProvider>
);

export default App;
