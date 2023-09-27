import {
  MockedResponse,
  RequestHandler,
  ResponseComposition,
  RestContext,
  rest,
} from "msw";
import { ENDPOINT } from "../constants";

const customContext = (res: MockedResponse) => {
  res.status = 200;
  res.body = JSON.stringify({
    username: "admin ne",
  });

  return res;
};

export const handlers: RequestHandler[] = [
  // Not use ctx
  rest.get("/user", (_, res: ResponseComposition) => {
    return res(customContext);
  }),

  // Use ctx
  rest.get(
    ENDPOINT.SignIn + "",
    (_, res: ResponseComposition, ctx: RestContext) => {
      return res(
        ctx.status(200),
        ctx.json({
          name: "This is post",
        })
      );
    }
  ),
];
