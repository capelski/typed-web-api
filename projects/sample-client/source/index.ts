import { validateCityName, WeatherEndpointResponse } from 'sample-common';
import {
  cityNameInput,
  errorMessage,
  icon,
  jsonBodyButton,
  jsonBodyV2Button,
  jsonBodyV3Button,
  maxTemperature,
  minTemperature,
  queryStringButton,
  queryStringV2Button,
  queryStringV3Button,
  requestBody,
  requestUrl,
  temperature,
  urlParamsButton,
  urlParamsV2Button,
  urlParamsV3Button,
  windSpeed,
} from './client-elements';
import { latestRequest } from './custom-fetch';
import { jsonBodyFetch, queryStringFetch, urlParamsFetch } from './fetch-weather';
import { jsonBodyV2Fetch, queryStringV2Fetch, urlParamsV2Fetch } from './fetch-weather-v2';
import { jsonBodyV3Fetch, queryStringV3Fetch, urlParamsV3Fetch } from './fetch-weather-v3';

jsonBodyButton.addEventListener('click', clickHandler(jsonBodyFetch));
urlParamsButton.addEventListener('click', clickHandler(urlParamsFetch));
queryStringButton.addEventListener('click', clickHandler(queryStringFetch));

jsonBodyV2Button.addEventListener('click', clickHandler(jsonBodyV2Fetch));
urlParamsV2Button.addEventListener('click', clickHandler(urlParamsV2Fetch));
queryStringV2Button.addEventListener('click', clickHandler(queryStringV2Fetch));

jsonBodyV3Button.addEventListener('click', clickHandler(jsonBodyV3Fetch));
urlParamsV3Button.addEventListener('click', clickHandler(urlParamsV3Fetch));
queryStringV3Button.addEventListener('click', clickHandler(queryStringV3Fetch));

function clickHandler(fetcher: (cityName: string) => Promise<WeatherEndpointResponse>) {
  return async function () {
    const cityName = cityNameInput.value;
    const cityNameValidation = validateCityName(cityName);

    if (!cityNameValidation.valid) {
      errorMessage.innerText = cityNameValidation.message;
      return;
    }

    errorMessage.innerText = '';

    try {
      const payload = await fetcher(cityName);

      if ('icon' in payload) {
        requestUrl.innerHTML = latestRequest.ref.url;
        requestBody.innerHTML = latestRequest.ref.body || '-';

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
}
