import { Before, Given, Then, When } from '@cucumber/cucumber';
import { expect } from 'chai';
import { buildUrl, BuildUrlOptions } from './build-url';

let options: undefined | BuildUrlOptions;
let path: undefined | string;
let result: undefined | string;

Before(() => {
  options = undefined;
  path = undefined;
  result = undefined;
});

Given(/a path "(.*)"/, (_path: string) => {
  path = _path;
});

Given(/a urlPrefix "(.*)"/, (urlPrefix: string) => {
  if (!options) {
    options = {};
  }
  options.urlPrefix = urlPrefix;
});

Given(/a baseUrl "(.*)"/, (baseUrl: string) => {
  if (!options) {
    options = {};
  }
  options.baseUrl = baseUrl;
});

Given(/a "(.*)" URL parameter with value "(.*)"/, (paramName: string, paramValue: string) => {
  if (!options) {
    options = {};
  }
  if (!options.urlParams) {
    options.urlParams = {};
  }
  options.urlParams[paramName] = paramValue;
});

Given(
  /a "(.*)" query string parameter with value "(.*)"/,
  (paramName: string, paramValue: string) => {
    if (!options) {
      options = {};
    }
    if (!options.queryString) {
      options.queryString = {};
    }
    options.queryString[paramName] = paramValue;
  },
);

When('calling buildUrl', () => {
  result = buildUrl(path!, options);
});

Then(/the returned url is "(.*)"/, (url: string) => {
  expect(result).to.equal(url);
});
