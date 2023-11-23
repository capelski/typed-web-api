import { BadRequestException } from '@nestjs/common';
import { validateCityName } from '@sample-nest-app/common';
import { AppService } from './app.service';

export const sampleEndpointCore = (cityName: string, appService: AppService) => {
  const cityNameValidation = validateCityName(cityName);

  if (!cityNameValidation.valid) {
    throw new BadRequestException({ errorMessage: cityNameValidation.message });
  }

  return appService.getRandomWeather();
};
