import { EndpointDefinition, JsonBody, QueryString, UrlParams } from '@typed-web-api/common';

export type Validation =
  | {
      valid: true;
    }
  | {
      valid: false;
      message: string;
    };

export type Weather = {
  icon: WeatherIcons;
  minTemperature: number;
  maxTemperature: number;
  temperature: number;
  windSpeed: number;
};

export type WeatherEndpointInput = { cityName: string };

export type WeatherEndpointResponse =
  | {
      errorMessage: string;
    }
  | Weather;

export enum WeatherIcons {
  clearSky = '01d',
  fewClouds = '02d',
  scatteredClouds = '03d',
  brokenClouds = '04d',
  showerRain = '09d',
  rain = '10d',
  thunderstorm = '11d',
  snow = '13d',
  mist = '50d',
}

export type WeatherEndpoints = {
  '/weather_get': EndpointDefinition<WeatherEndpointResponse, QueryString<{ cityName: string }>>;
  '/weather_post': EndpointDefinition<WeatherEndpointResponse, JsonBody<{ cityName: string }>>;
  '/weather/:cityName_get': EndpointDefinition<
    WeatherEndpointResponse,
    UrlParams<{ cityName: string }>
  >;
};

export type WeatherV2Endpoints = {
  '/v2/weather_get': EndpointDefinition<WeatherEndpointResponse, QueryString<{ cityName: string }>>;
  '/v2/weather_post': EndpointDefinition<WeatherEndpointResponse, JsonBody<{ cityName: string }>>;
  '/v2/weather/:cityName_get': EndpointDefinition<
    WeatherEndpointResponse,
    UrlParams<{ cityName: string }>
  >;
};

export type WeatherApi = WeatherEndpoints & WeatherV2Endpoints;

const minimumCharacters = 3;

export const validateCityName = (cityName: string | undefined): Validation => {
  return !cityName
    ? { valid: false, message: 'Missing city name' }
    : cityName.length < minimumCharacters
      ? { valid: false, message: `City name must have at least ${minimumCharacters} characters` }
      : { valid: true };
};
