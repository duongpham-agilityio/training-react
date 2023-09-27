import { IUser } from "../../interfaces";

const getUsers = (): IUser[] => {
  try {
    const users: IUser[] = JSON.parse(localStorage.getItem("users") || "[]");

    return users;
  } catch (err) {
    throw new Error("Can not get store");
  }
};

const getUser = (username: string): IUser | undefined => {
  const users = getUsers();
  const user = users.find((u) => username === u.username);

  return user;
};

export default { getUsers, getUser };
