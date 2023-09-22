import { QueryFunction, useQuery } from "@tanstack/react-query";

// Types
import { IPost } from "../../interfaces";
import { ENDPOINT, URL } from "../../constants/fetch";
import { waitFewSecond } from "../../helpers";
import { useState } from "react";

const queryFn: QueryFunction<IPost[], string[]> = ({ queryKey }) => {
  const [, page = 1] = queryKey;

  return fetch(`${URL.BaseURL}${ENDPOINT.Posts}?_page=${page}&limit=8`).then(
    (res) => waitFewSecond<IPost[]>(res.json())
  );
};

const Paginated = () => {
  const [page, setPage] = useState(1);
  const { isLoading, isError, error, data, isFetching } = useQuery({
    queryKey: [ENDPOINT.Posts, `${page}`],
    queryFn,
    keepPreviousData: true,
  });

  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : isError ? (
        <div>Error: {`${error}`}</div>
      ) : (
        <div>
          {data.map((project) => (
            <p key={project.id}>{project.title}</p>
          ))}
        </div>
      )}
      <span>Current Page: {page}</span>
      <button
        onClick={() => setPage((old) => Math.max(old - 1, 0))}
        disabled={page === 0}
      >
        Previous Page
      </button>{" "}
      <button
        onClick={() => {
          setPage((old) => old + 1);
        }}
      >
        Next Page
      </button>
      {isFetching ? <span> Loading...</span> : null}{" "}
    </div>
  );
};

export default Paginated;
