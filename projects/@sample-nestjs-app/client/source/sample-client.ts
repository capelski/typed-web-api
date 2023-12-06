import { validateCityName, WeatherEndpointResponse } from '@sample-nestjs-app/common';
import { TypedResponse } from '@typed-web-api/client';
import {
  apiJsonBodyButton,
  apiParamsButton,
  apiQueryButton,
  apiV2JsonBodyButton,
  apiV2ParamsButton,
  apiV2QueryButton,
  cityNameInput,
  errorMessage,
  icon,
  maxTemperature,
  minTemperature,
  requestBody,
  requestUrl,
  temperature,
  windSpeed,
} from './sample-elements';
import { getApiFetchers } from './sample-typed-fetch';

let latestRequest: {
  url: string;
  body?: string;
};

const requestWeatherData = async (
  fetcher: (cityName: string) => Promise<TypedResponse<WeatherEndpointResponse>>,
) => {
  const cityName = cityNameInput.value;
  const cityNameValidation = validateCityName(cityName);

  if (!cityNameValidation.valid) {
    errorMessage.innerText = cityNameValidation.message;
    return;
  }
  errorMessage.innerText = '';

  const response = await fetcher(cityName);

  try {
    const payload = await response.json();
    if ('icon' in payload) {
      requestUrl.innerHTML = latestRequest.url;
      requestBody.innerHTML = latestRequest.body || '-';

      icon.src = `http://openweathermap.org/img/wn/${payload.icon}@2x.png`;
      temperature.innerText = String(payload.temperature);
      minTemperature.innerText = String(payload.minTemperature);
      maxTemperature.innerText = String(payload.maxTemperature);
      windSpeed.innerText = String(payload.windSpeed);
    } else {
      errorMessage.innerText = payload.errorMessage;
    }
  } catch (error) {
    console.error(error);
    errorMessage.innerText = 'Network error';
  }
};

export function fetchWrapper(...args: Parameters<typeof fetch>) {
  latestRequest = {
    url: <string>args[0],
    body: <string>args[1]?.body,
  };
  return fetch(...args);
}

const apiFetchers = getApiFetchers(fetchWrapper as Window['fetch']);

apiJsonBodyButton.addEventListener('click', () => requestWeatherData(apiFetchers.jsonBody));
apiParamsButton.addEventListener('click', () => requestWeatherData(apiFetchers.urlParams));
apiQueryButton.addEventListener('click', () => requestWeatherData(apiFetchers.queryString));
apiV2JsonBodyButton.addEventListener('click', () => requestWeatherData(apiFetchers.jsonBodyV2));
apiV2ParamsButton.addEventListener('click', () => requestWeatherData(apiFetchers.urlParamsV2));
apiV2QueryButton.addEventListener('click', () => requestWeatherData(apiFetchers.queryStringV2));
