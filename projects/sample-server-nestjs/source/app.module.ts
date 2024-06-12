import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { WeatherV2Controller } from './weather-v2.controller';
import { WeatherV3Controller } from './weather-v3.controller';
import { WeatherController } from './weather.controller';

@Module({
  controllers: [WeatherController, WeatherV2Controller, WeatherV3Controller],
  providers: [AppService],
})
export class AppModule {}
