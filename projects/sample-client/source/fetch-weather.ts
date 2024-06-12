import { typedFetch } from './sample-typed-fetch';

export const jsonBodyFetch = async (cityName: string) => {
  const response = await typedFetch('/weather_post', {
    jsonBody: { cityName },
  });
  return response.json();
};

export const urlParamsFetch = async (cityName: string) => {
  const response = await typedFetch('/weather/:cityName_get', {
    urlParams: { cityName },
  });
  return response.json();
};

export const queryStringFetch = async (cityName: string) => {
  const response = await typedFetch('/weather_get', {
    queryString: { cityName },
  });
  return response.json();
};
