import { HTMLAttributes } from 'react';
import { Todo } from 'types';
import { TodoItem } from 'components/TodoItem';
/* eslint-disable no-unused-vars */

type TodosProps = HTMLAttributes<HTMLUListElement> &
  HTMLAttributes<HTMLLIElement> & {
    todos?: Todo[];
  };

export const Todos = (props: TodosProps) => {
  const { todos = [], onClick, ...rest } = props;

  return (
    <ul {...rest}>
      {todos.map(({ completed, ...rest }, index) => {
        return <TodoItem {...rest} key={index} onClick={onClick} />;
      })}
    </ul>
  );
};
