import { useMutation, useQuery } from "@tanstack/react-query";
import { getTodo, updateTodo } from "../../services/todo";
import { Todo } from "./Todo";
import { ITodo } from "../../interfaces";

const Mutation = () => {
  const {
    data = [],
    isLoading,
    isError,
    refetch,
  } = useQuery(["todo"], {
    queryFn: getTodo,
  });

  const {
    data: a,
    mutate,
    isLoading: isPending,
  } = useMutation({
    mutationKey: ["todo"],
    mutationFn: (todo: ITodo) => {
      return updateTodo(todo.id, todo).then(() => refetch());
    },
  });

  console.log(a);

  const onSubmit = (todo: ITodo) => {
    mutate(todo);
  };

  if (isError) return <p>Error</p>;

  if (isLoading) return <p>Loading...</p>;

  if (isPending) return <p>Updating...</p>;

  return (
    <>
      <h2>Mutation</h2>
      {data.map((todo) => (
        <Todo key={todo.id} todo={todo} onSubmit={onSubmit} />
      ))}
    </>
  );
};

export default Mutation;
