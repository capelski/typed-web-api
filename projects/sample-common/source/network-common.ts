import { EndpointDefinition, JsonBody, QueryString, UrlParams } from '@typed-web-api/common';
import { Weather } from './domain-common';

export type WeatherEndpointInput = { cityName: string };

export type WeatherEndpointResponse =
  | {
      errorMessage: string;
    }
  | Weather;

export type WeatherEndpoints = {
  '/weather_get': EndpointDefinition<WeatherEndpointResponse, QueryString<WeatherEndpointInput>>;
  '/weather_post': EndpointDefinition<WeatherEndpointResponse, JsonBody<WeatherEndpointInput>>;
  '/weather/:cityName_get': EndpointDefinition<
    WeatherEndpointResponse,
    UrlParams<WeatherEndpointInput>
  >;
};

export type WeatherV3EndpointInput = { city_name: string };

export type WeatherV3Endpoints = {
  '/v3/weather_get': EndpointDefinition<
    WeatherEndpointResponse,
    QueryString<WeatherV3EndpointInput>
  >;
  '/v3/weather_post': EndpointDefinition<WeatherEndpointResponse, JsonBody<WeatherV3EndpointInput>>;
  '/v3/weather/:city_name_get': EndpointDefinition<
    WeatherEndpointResponse,
    UrlParams<WeatherV3EndpointInput>
  >;
};

export type WeatherApi = WeatherEndpoints & WeatherV3Endpoints;
