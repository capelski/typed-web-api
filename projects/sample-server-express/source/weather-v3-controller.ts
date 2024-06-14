import { ServerEndpoints } from '@typed-web-api/express';
import { validateCityName, WeatherV3Endpoints } from 'sample-common';
import { getRandomWeather } from './sample-domain-logic';

/** Different implementation of WeatherEndpoints (breaking changes) exposed at a different URL.
 * Deliberately untyped request payloads for demonstration purposes */

export const weatherV3Controller: ServerEndpoints<WeatherV3Endpoints> = {
  '/v3/weather_get'(req) {
    const cityNameValidation = validateCityName(req.query.city_name as string);

    if (!cityNameValidation.valid) {
      return { payload: { errorMessage: cityNameValidation.message }, status: 400 };
    }

    // Asynchronous just for demonstration purposes
    return Promise.resolve({ payload: getRandomWeather() });
  },

  '/v3/weather_post'(req) {
    const cityNameValidation = validateCityName(req.body?.city_name);

    if (!cityNameValidation.valid) {
      return { payload: { errorMessage: cityNameValidation.message }, status: 400 };
    }
    return { payload: getRandomWeather() };
  },

  '/v3/weather/:city_name_get'(req) {
    const cityNameValidation = validateCityName(req.params.city_name);

    if (!cityNameValidation.valid) {
      return { payload: { errorMessage: cityNameValidation.message }, status: 400 };
    }
    return { payload: getRandomWeather() };
  },
};
