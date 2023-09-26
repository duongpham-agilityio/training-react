interface IURL {
  BaseURL: string;
}

export const URL: Readonly<IURL> = {
  BaseURL: window.location.origin,
};
