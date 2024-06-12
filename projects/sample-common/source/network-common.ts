import { EndpointDefinition, JsonBody, QueryString, UrlParams } from '@typed-web-api/common';
import { Weather } from './domain-common';

export type WeatherEndpointInput = { cityName: string };

export type WeatherEndpointResponse =
  | {
      errorMessage: string;
    }
  | Weather;

export type WeatherEndpoints = {
  '/weather_get': EndpointDefinition<WeatherEndpointResponse, QueryString<{ cityName: string }>>;
  '/weather_post': EndpointDefinition<WeatherEndpointResponse, JsonBody<{ cityName: string }>>;
  '/weather/:cityName_get': EndpointDefinition<
    WeatherEndpointResponse,
    UrlParams<{ cityName: string }>
  >;
};

export type WeatherV3Endpoints = {
  '/v3/weather_get': EndpointDefinition<
    WeatherEndpointResponse,
    QueryString<{ city_name: string }>
  >;
  '/v3/weather_post': EndpointDefinition<WeatherEndpointResponse, JsonBody<{ city_name: string }>>;
  '/v3/weather/:city_name_get': EndpointDefinition<
    WeatherEndpointResponse,
    UrlParams<{ city_name: string }>
  >;
};

export type WeatherApi = WeatherEndpoints & WeatherV3Endpoints;
