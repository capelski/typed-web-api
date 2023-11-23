import { ApiDefinition } from '@typed-web-api/common';

export type ServerEndpoints<TApi extends ApiDefinition> = {
  [path_method in keyof TApi]: (...args: any[]) => TApi[path_method]['response'];
};
