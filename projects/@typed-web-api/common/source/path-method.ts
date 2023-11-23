export enum HttpMethods {
  delete = 'delete',
  get = 'get',
  patch = 'patch',
  post = 'post',
  put = 'put',
}

export type PathMethod = {
  method: HttpMethods;
  path: string;
};

export const splitPathMethod = (path_method: string): PathMethod => {
  const parts = path_method.split('_');
  const method = parts[parts.length - 1] as HttpMethods;

  if (!Object.values(HttpMethods).includes(method)) {
    throw new Error(
      `Invalid endpoint format "${path_method}". Endpoints must end with an underscore followed by an http method.` +
        ' Examples: /users/:id/_get, /users_post or /users/put/:id_put.',
    );
  }

  const path = parts.slice(0, parts.length - 1).join('_');

  return {
    method,
    path,
  };
};
