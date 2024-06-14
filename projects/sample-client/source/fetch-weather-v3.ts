import { typedFetch } from './sample-typed-fetch';

// Deliberately untyped request payloads for demonstration purposes

export const jsonBodyV3Fetch = async (city_name: string) => {
  const response = await typedFetch('/v3/weather_post', {
    init: {
      headers: { ['Content-Type']: 'application/json' },
      body: JSON.stringify({ city_name }),
    },
  });
  return response.json();
};

export const urlParamsV3Fetch = async (city_name: string) => {
  const response = await typedFetch('/v3/weather/:city_name_get', {
    urlParams: { city_name },
  });
  return response.json();
};

export const queryStringV3Fetch = async (city_name: string) => {
  const response = await typedFetch('/v3/weather_get', {
    queryString: { city_name },
  });
  return response.json();
};
