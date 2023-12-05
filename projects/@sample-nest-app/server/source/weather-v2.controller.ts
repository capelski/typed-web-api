import { Body, Controller, Param, Query } from '@nestjs/common';
import { WeatherV2Endpoints } from '@sample-nest-app/common';
import { HttpMethod, ServerEndpoints } from '@typed-web-api/nestjs';
import { AppService } from './app.service';
import { sampleEndpointCore } from './sample-endpoint-core';

@Controller()
export class WeatherV2Controller implements ServerEndpoints<WeatherV2Endpoints> {
  constructor(private readonly appService: AppService) {}

  @HttpMethod()
  '/v2/weather_get'(@Query('cityName') cityName: string) {
    return sampleEndpointCore(cityName, this.appService);
  }

  @HttpMethod()
  '/v2/weather_post'(@Body('cityName') cityName: string) {
    return sampleEndpointCore(cityName, this.appService);
  }

  @HttpMethod()
  '/v2/weather/:cityName_get'(@Param('cityName') cityName: string) {
    return sampleEndpointCore(cityName, this.appService);
  }
}
