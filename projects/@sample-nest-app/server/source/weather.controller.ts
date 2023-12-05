import { Body, Controller, Param, Query } from '@nestjs/common';
import { WeatherEndpoints } from '@sample-nest-app/common';
import { HttpMethod, ServerEndpoints } from '@typed-web-api/nestjs';
import { AppService } from './app.service';
import { sampleEndpointCore } from './sample-endpoint-core';

@Controller()
export class WeatherController implements ServerEndpoints<WeatherEndpoints> {
  constructor(private readonly appService: AppService) {}

  @HttpMethod()
  '/weather_get'(@Query('cityName') cityName: string) {
    return sampleEndpointCore(cityName, this.appService);
  }

  @HttpMethod()
  '/weather_post'(@Body('cityName') cityName: string) {
    return sampleEndpointCore(cityName, this.appService);
  }

  @HttpMethod()
  '/weather/:cityName_get'(@Param('cityName') cityName: string) {
    return sampleEndpointCore(cityName, this.appService);
  }
}
