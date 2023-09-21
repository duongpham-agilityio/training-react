import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Components
import FirstStep from "./examples/FirstStep";
import TypeScript from "./examples/Typescript";
import Queries from "./examples/Queries";
import QueryFunction from "./examples/QueryFunction";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <FirstStep />
    <TypeScript />
    <Queries />
    <QueryFunction />
  </QueryClientProvider>
);

export default App;
