import {
  MockedResponse,
  RequestHandler,
  ResponseFunction,
  RestContext,
  rest,
} from "msw";

const customContext = (res: MockedResponse) => {
  res.status = 200;
  res.body = JSON.stringify({
    username: "admin ne",
  });

  return res;
};

export const handlers: RequestHandler[] = [
  // Not use ctx
  rest.get("/user", (_, res: ResponseFunction) => {
    return res(customContext);
  }),

  // Use ctx
  rest.get("/post", (_, res: ResponseFunction, ctx: RestContext) => {
    return res(
      ctx.status(200),
      ctx.json({
        name: "This is post",
      })
    );
  }),
];
