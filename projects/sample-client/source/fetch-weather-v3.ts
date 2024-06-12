import { typedFetch } from './sample-typed-fetch';

export const jsonBodyV3Fetch = async (city_name: string) => {
  const response = await typedFetch('/v3/weather_post', {
    jsonBody: { city_name },
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
