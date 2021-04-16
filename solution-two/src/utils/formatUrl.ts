export const formatUrl = (urlBase: string, path: string): string =>
  `${urlBase}${!urlBase.endsWith('/') ? '/' : ''}${formatPath(path)}`;

const formatPath = (path: string): string => {
  if (path.startsWith('?')) {
    return path;
  }
  return path.startsWith('/') ? path.slice(1) : path;
};
