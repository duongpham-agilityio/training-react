import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../../services";

const Queries = () => {
  const {
    isLoading,
    isError,
    error,
    data: posts = [],
  } = useQuery(["posts"], {
    queryFn: getPosts,
  });

  if (isError) return <p>{`${error}`}</p>;

  if (isLoading) return <p>Loading...</p>;

  return (
    <section
      style={{
        border: "1px solid",
        padding: "20px",
      }}
    >
      <p>Example for Queries</p>
      <h2>Posts</h2>
      <ul>
        {posts.slice(0, 10).map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </section>
  );
};

export default Queries;
