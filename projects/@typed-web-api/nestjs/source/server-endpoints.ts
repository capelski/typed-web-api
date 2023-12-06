import { ApiDefinition } from '@typed-web-api/common';

export type ServerEndpoints<TApi extends ApiDefinition> = {
  [TEndpointName in keyof TApi]: (
    ...args: any[]
  ) => TApi[TEndpointName]['response'] | Promise<TApi[TEndpointName]['response']>;
};
