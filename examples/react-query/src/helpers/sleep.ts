// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const waitFewSecond = <T>(data: any, timeout = 3000): Promise<T> =>
  new Promise<T>((resolve) => setTimeout(() => resolve(data), timeout));
