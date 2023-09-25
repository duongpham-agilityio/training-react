import { ENDPOINT, URL } from "../constants/fetch";
import { ITodo } from "../interfaces";

export const getTodo = (): Promise<ITodo[]> =>
  fetch(`${URL.MockApi}${ENDPOINT.Todo}`).then((res) => res.json());

export const updateTodo = (id: string, payload: Partial<ITodo>) =>
  fetch(`${URL.MockApi}${ENDPOINT.Todo}/${id}`, {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(payload),
  });
