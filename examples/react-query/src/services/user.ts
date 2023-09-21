// Constants
import { ENDPOINT, URL } from "../constants/fetch";

// Types
import { IUser } from "../interfaces";

export const getUsers = (): Promise<IUser[]> =>
  fetch(`${URL.BaseURL}${ENDPOINT.Users}`).then((res) => res.json());
