import { validateCityName, WeatherEndpointResponse } from '@sample-express-app/common';
import { EndpointResponse } from '@typed-web-api/express-server';
import { getRandomWeather } from './sample-domain-logic';

export const sampleEndpointCore = (
  cityName?: string,
): EndpointResponse<WeatherEndpointResponse> => {
  const cityNameValidation = validateCityName(cityName);

  if (!cityNameValidation.valid) {
    return { payload: { errorMessage: cityNameValidation.message }, status: 400 };
  }
  return { payload: getRandomWeather() };
};
