import { getTypedFetch } from '@typed-web-api/client';
import { WeatherApi } from 'sample-common';
import { customFetch } from './custom-fetch';

export const typedFetch = getTypedFetch<WeatherApi>({
  baseUrl: '/api', // Global prefix
  fetch: customFetch /** Fetch wrapper that keeps data from the latest request */,
});
