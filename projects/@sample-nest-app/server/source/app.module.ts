import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { WeatherV2Controller } from './weather-v2.controller';
import { WeatherController } from './weather.controller';

@Module({
  controllers: [WeatherController, WeatherV2Controller],
  providers: [AppService],
})
export class AppModule {}
