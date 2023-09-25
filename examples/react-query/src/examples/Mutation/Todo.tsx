import { ChangeEvent, useState } from "react";

// Types
import { ITodo } from "../../interfaces";

interface TodoProps {
  todo: ITodo;
  onSubmit: (payload: ITodo) => Promise<void> | void;
}

export const Todo = ({ todo, onSubmit }: TodoProps) => {
  const [state, setState] = useState<ITodo>(todo);
  const submitHandler = () => {
    onSubmit(state);
  };

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setState((prev) => ({
      ...prev,
      name: value,
    }));
  };

  return (
    <div>
      <input value={state.name} onChange={changeHandler} />
      <button onClick={submitHandler}>Submit</button>
    </div>
  );
};
