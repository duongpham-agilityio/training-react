interface IURL {
  BaseURL: string;
}

interface IEndPoint<T = string> {
  Root: T;
  User: T;
  Post: T;

  // Auth
  Auth: T;
  SignIn: T;
}

export const URL: Readonly<IURL> = {
  BaseURL: window.location.origin,
};

export const ENDPOINT: Readonly<IEndPoint> = {
  Root: "/",
  User: "/users",
  Post: "/post",
  Auth: "/auth",
  SignIn: "/auth/sign-in",
};
