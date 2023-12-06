import { Injectable } from '@nestjs/common';
import { Weather, WeatherIcons } from '@sample-nestjs-app/common';

const randomFloat = (min: number, max: number, decimals = 2) => {
  const randomNumber = Math.random() * (max - min + 1) + min;
  const roundFactor = Math.pow(10, decimals);
  return Math.round(randomNumber * roundFactor) / roundFactor;
};

const randomWeatherIcon = () => {
  const icons = Object.values(WeatherIcons) as WeatherIcons[];
  return icons[Math.floor(Math.random() * icons.length)];
};

@Injectable()
export class AppService {
  getRandomWeather(): Weather {
    return {
      icon: randomWeatherIcon(),
      maxTemperature: randomFloat(20, 40),
      minTemperature: randomFloat(0, 20),
      temperature: randomFloat(10, 30),
      windSpeed: randomFloat(0, 10),
    };
  }
}
