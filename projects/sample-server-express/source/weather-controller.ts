import { ServerEndpoints, TypedExpressRequest } from '@typed-web-api/express';
import { validateCityName, WeatherEndpoints } from 'sample-common';
import { getRandomWeather } from './sample-domain-logic';

export const weatherController: ServerEndpoints<WeatherEndpoints> = {
  '/weather_get'(req: TypedExpressRequest<WeatherEndpoints, '/weather_get'>) {
    const cityNameValidation = validateCityName(req.query.cityName);

    if (!cityNameValidation.valid) {
      return { payload: { errorMessage: cityNameValidation.message }, status: 400 };
    }

    // Asynchronous just for demonstration purposes
    return Promise.resolve({ payload: getRandomWeather() });
  },

  '/weather_post'(req: TypedExpressRequest<WeatherEndpoints, '/weather_post'>) {
    const cityNameValidation = validateCityName(req.body?.cityName);

    if (!cityNameValidation.valid) {
      return { payload: { errorMessage: cityNameValidation.message }, status: 400 };
    }
    return { payload: getRandomWeather() };
  },

  '/weather/:cityName_get'(req: TypedExpressRequest<WeatherEndpoints, '/weather/:cityName_get'>) {
    const cityNameValidation = validateCityName(req.params.cityName);

    if (!cityNameValidation.valid) {
      return { payload: { errorMessage: cityNameValidation.message }, status: 400 };
    }
    return { payload: getRandomWeather() };
  },
};
