import { WeatherApi } from '@sample-nestjs-app/common';
import { getTypedFetch } from '@typed-web-api/client';

export const getApiFetchers = (fetchWrapper: Window['fetch']) => {
  const typedFetch = getTypedFetch<WeatherApi>({ baseUrl: '/api', fetch: fetchWrapper });

  return {
    jsonBody: (cityName: string) =>
      typedFetch('/weather_post', {
        init: { headers: { 'Content-Type': 'application/json' } },
        jsonBody: { cityName },
      }),
    urlParams: (cityName: string) =>
      typedFetch('/weather/:cityName_get', {
        urlParams: { cityName },
      }),
    queryString: (cityName: string) => typedFetch('/weather_get', { queryString: { cityName } }),

    jsonBodyV2: (cityName: string) =>
      typedFetch('/v2/weather_post', {
        init: { headers: { 'Content-Type': 'application/json' } },
        jsonBody: { cityName },
      }),
    urlParamsV2: (cityName: string) =>
      typedFetch('/v2/weather/:cityName_get', {
        urlParams: { cityName },
      }),
    queryStringV2: (cityName: string) =>
      typedFetch('/v2/weather_get', {
        queryString: { cityName },
      }),
  };
};
