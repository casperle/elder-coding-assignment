// eslint-disable-next-line @typescript-eslint/no-empty-function
export const noop = () => {};

// eslint-disable-next-line @typescript-eslint/require-await
export const noopPromise = async <T>() => {
  return {} as T;
};

export const noopObject = <T>() => {
  return {} as T;
};
