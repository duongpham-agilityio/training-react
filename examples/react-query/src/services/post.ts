// Constants
import { ENDPOINT, URL } from "../constants/fetch";

// Types
import { IPost } from "../interfaces";

export const getPosts = (): Promise<IPost[]> =>
  new Promise((resolve, reject) => {
    fetch(`${URL.BaseURL}${ENDPOINT.Posts}`)
      .then((res) => {
        setTimeout(() => {
          resolve(res.json());
        }, 3000);
      })
      .catch(() => {
        setTimeout(() => {
          reject(new Error("Can not fetching data!!!!"));
        }, 3000);
      });
  });
