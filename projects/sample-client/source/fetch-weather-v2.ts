import { typedFetch } from './sample-typed-fetch';

export const jsonBodyV2Fetch = async (cityName: string) => {
  const response = await typedFetch('/weather_post', {
    jsonBody: { cityName },
    urlPrefix: '/v2', // Controller prefix
  });
  return response.json();
};

export const urlParamsV2Fetch = async (cityName: string) => {
  const response = await typedFetch('/weather/:cityName_get', {
    urlParams: { cityName },
    urlPrefix: '/v2', // Controller prefix
  });
  return response.json();
};

export const queryStringV2Fetch = async (cityName: string) => {
  const response = await typedFetch('/weather_get', {
    queryString: { cityName },
    urlPrefix: '/v2', // Controller prefix
  });
  return response.json();
};
