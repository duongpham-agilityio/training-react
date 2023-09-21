import { useQuery, QueryFunction } from "@tanstack/react-query";

// Types
import { IPost } from "../../interfaces";

const queryFn: QueryFunction<IPost[], string[]> = ({ queryKey }) => {
  console.log(queryKey);

  return Promise.resolve<IPost[]>([]);
};

const QueryFunctionComponent = () => {
  const { data } = useQuery(["demo"], {
    queryFn,
  });

  return (
    <section
      style={{
        border: "1px solid",
        padding: "20px",
      }}
    >
      <h2>Example for Query function</h2>
      <p>{JSON.stringify(data)}</p>
    </section>
  );
};

export default QueryFunctionComponent;
