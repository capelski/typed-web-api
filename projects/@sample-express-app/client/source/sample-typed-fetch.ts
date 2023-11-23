import { WeatherApi } from '@sample-express-app/common';
import { getTypedFetch } from '@typed-web-api/client';

export const getApiFetchers = (fetchWrapper: Window['fetch']) => {
  const typedFetch = getTypedFetch<WeatherApi>({ fetch: fetchWrapper });

  return {
    fullPath: {
      jsonBody: (cityName: string) =>
        typedFetch('/full-path/weather_post', {
          init: { headers: { 'Content-Type': 'application/json' } },
          jsonBody: { cityName },
        }),
      urlParams: (cityName: string) =>
        typedFetch('/full-path/weather/:cityName_get', {
          urlParams: { cityName },
        }),
      queryString: (cityName: string) =>
        typedFetch('/full-path/weather_get', { queryString: { cityName } }),
    },

    expressRouter: {
      jsonBody: (cityName: string) =>
        typedFetch('/weather_post', {
          init: { headers: { 'Content-Type': 'application/json' } },
          jsonBody: { cityName },
          urlPrefix: '/express-router',
        }),
      urlParams: (cityName: string) =>
        typedFetch('/weather/:cityName_get', {
          urlParams: { cityName },
          urlPrefix: '/express-router',
        }),
      queryString: (cityName: string) =>
        typedFetch('/weather_get', {
          queryString: { cityName },
          urlPrefix: '/express-router',
        }),
    },
  };
};
