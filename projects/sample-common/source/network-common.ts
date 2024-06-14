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

// Deliberately untyped request payloads for demonstration purposes
export type WeatherV3Endpoints = {
  '/v3/weather_get': EndpointDefinition<WeatherEndpointResponse>;
  '/v3/weather_post': EndpointDefinition<WeatherEndpointResponse>;
  '/v3/weather/:city_name_get': EndpointDefinition<WeatherEndpointResponse>;
};

export type WeatherApi = WeatherEndpoints & WeatherV3Endpoints;
