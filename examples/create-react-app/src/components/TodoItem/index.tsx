import { HTMLAttributes } from 'react';
import './todo-item.css';

type TodoItemProps = HTMLAttributes<HTMLLIElement> & {
  title: string;
  icon: string;
  id: string;
};

export const TodoItem = (props: TodoItemProps) => {
  const { title, icon, id, className, onClick, ...rest } = props;
  //   attributes for todo item
  const todoItem = {
    ...rest,
    className: `todo-item ${className}`,
  };

  //   attributes for todo title
  const todoTitle = {
    className: 'todo-title',
  };

  //   attributes for todo icon
  const todoIcon = {
    onClick,
    className: 'todo-icon',
    'data-id': id,
  };

  return (
    <li {...todoItem}>
      <p {...todoTitle}>
        {title}
        <span {...todoIcon}>{icon}</span>
      </p>
    </li>
  );
};
