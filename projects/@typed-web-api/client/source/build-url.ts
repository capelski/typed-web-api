import { QueryStringBase, UrlParamsBase } from '@typed-web-api/common';

export type BuildUrlOptions = {
  baseUrl?: string;
  queryString?: QueryStringBase;
  urlParams?: UrlParamsBase;
  urlPrefix?: string;
};

export const buildUrl = (path: string, options: BuildUrlOptions = {}) => {
  const prefixedUrl = options.urlPrefix ? options.urlPrefix + path : path;
  const basedUrl = options.baseUrl ? options.baseUrl + prefixedUrl : prefixedUrl;

  const paramUrl = options.urlParams
    ? Object.keys(options.urlParams).reduce((reduced, paramName) => {
        const paramValue = options.urlParams![paramName];
        return reduced.replace(`:${paramName}`, paramValue);
      }, basedUrl)
    : basedUrl;

  const queryUrl =
    options.queryString && Object.keys(options.queryString).length > 0
      ? paramUrl + '?' + new URLSearchParams(options.queryString).toString()
      : paramUrl;

  return queryUrl;
};
