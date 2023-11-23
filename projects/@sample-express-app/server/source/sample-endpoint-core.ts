import { validateCityName } from '@sample-express-app/common';
import { EndpointResponse } from '@typed-web-api/express-server';
import { getRandomWeather } from './sample-domain-logic';

export const sampleEndpointCore = (cityName?: string) => {
  const cityNameValidation = validateCityName(cityName);

  if (!cityNameValidation.valid) {
    return new EndpointResponse({ errorMessage: cityNameValidation.message }, 400);
  }
  return new EndpointResponse(getRandomWeather());
};
