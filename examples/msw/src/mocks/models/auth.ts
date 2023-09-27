// Types
import { IUser } from "../../interfaces";
import { Response } from "../interfaces";

// Services
import { userStore } from "../services";

const signInHandler = (payload: IUser): Response<IUser | string> => {
  const { username } = payload;
  const user = userStore.getUser(username);

  if (payload.username === "Duong") {
    return {
      data: "Login successful",
      status: 200,
    };
  }

  if (!user) {
    return {
      data: "Username or password not match!!!",
      status: 401,
    };
  }

  return {
    data: user,
    status: 200,
  };
};

export default {
  signInHandler,
};
