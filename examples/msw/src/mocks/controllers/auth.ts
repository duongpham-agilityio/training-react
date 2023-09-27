import { ResponseComposition, RestContext, RestRequest } from "msw";

// Models
import { authModel } from "../models";

// Interfaces
import { IUser } from "../../interfaces";

const signIn = async (
  req: RestRequest,
  res: ResponseComposition,
  ctx: RestContext
) => {
  try {
    const user: IUser = await req.json();
    const { data, status } = authModel.signInHandler(user);

    return res(ctx.status(status), ctx.json(data));
  } catch (error) {
    return res(ctx.status(404), ctx.json(""));
  }
};

const signUp = async (
  req: RestRequest,
  res: ResponseComposition,
  ctx: RestContext
) => {
  try {
    const user: IUser = await req.json();
    const { data, status } = authModel.signInHandler(user);

    return res(ctx.status(status), ctx.json({ data }));
  } catch (error) {
    return res(ctx.status(404), ctx.json(""));
  }
};

export default {
  signIn,
  signUp,
};
