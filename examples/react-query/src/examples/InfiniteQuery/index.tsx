import { Fragment } from "react";
import { QueryFunctionContext, useInfiniteQuery } from "@tanstack/react-query";

// Types
import { IPost } from "../../interfaces";

// Constants
import { ENDPOINT, URL } from "../../constants/fetch";

const getPosts = ({ pageParam = 1 }: QueryFunctionContext): Promise<IPost[]> =>
  fetch(`${URL.BaseURL}${ENDPOINT.Posts}?_page=${pageParam}`)
    .then((res) => res.json())
    .catch(() => new Error("Can not fetching data!!!!"));

const InfiniteQuery = () => {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["projects"],
    queryFn: getPosts,
    getNextPageParam: (lastPage, pages) => {
      const isContinue = lastPage.length > 0;

      if (isContinue) return pages.length + 1;

      return undefined;
    },
  });

  console.log("data", data);

  return status === "loading" ? (
    <p>Loading...</p>
  ) : status === "error" ? (
    <p>Error: {(error as unknown as Error).message}</p>
  ) : (
    <>
      {data.pages.map((posts = [], i) => {
        return (
          <Fragment key={i}>
            {posts.map((post) => (
              <p key={post.id}>{post.title}</p>
            ))}
          </Fragment>
        );
      })}
      <div>
        <button
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
        >
          {isFetchingNextPage
            ? "Loading more..."
            : hasNextPage
            ? "Load More"
            : "Nothing more to load"}
        </button>
      </div>
      <div>{isFetching && !isFetchingNextPage ? "Fetching..." : null}</div>
    </>
  );
};

export default InfiniteQuery;
