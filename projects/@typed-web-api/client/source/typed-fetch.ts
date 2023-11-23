import { ApiDefinition } from '@typed-web-api/common';
import { getTypedFetchCore, GetTypedFetchOptions } from './typed-fetch-core';

export const getTypedFetch = <TApi extends ApiDefinition>(options: GetTypedFetchOptions = {}) => {
  if (options.fetch === undefined && typeof fetch === 'undefined') {
    throw new Error('fetch is not available in this context');
  }
  return getTypedFetchCore<TApi>(options.fetch || fetch, options);
};
