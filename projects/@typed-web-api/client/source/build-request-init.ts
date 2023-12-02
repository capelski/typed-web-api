import { Dictionary, HttpMethods } from '@typed-web-api/common';

export type BuildRequestInitOptions = {
  init?: RequestInit;
  jsonBody?: {};
};

export const buildRequestInit = (method: HttpMethods, options: BuildRequestInitOptions = {}) => {
  const requestInit: RequestInit = {
    ...options.init,
    method,
  };

  if (options.jsonBody) {
    requestInit.body = JSON.stringify(options.jsonBody);
    if (!requestInit.headers) {
      requestInit.headers = {};
    }
    (requestInit.headers as Dictionary<string>)['Content-Type'] = 'application/json';
  }

  return requestInit;
};
