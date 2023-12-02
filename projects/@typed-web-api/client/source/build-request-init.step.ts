import { Before, Given, Then, When } from '@cucumber/cucumber';
import { Dictionary, HttpMethods } from '@typed-web-api/common';
import { expect } from 'chai';
import { buildRequestInit, BuildRequestInitOptions } from './build-request-init';

let options: BuildRequestInitOptions;
let method: undefined | HttpMethods;
let result: undefined | RequestInit;

Before(() => {
  options = {};
  method = undefined;
  result = undefined;
});

Given(/a method "(.*)"/, (_method: HttpMethods) => {
  method = _method;
});

Given('any method', () => {
  method = HttpMethods.delete;
});

Given(
  /an init parameter property "(.*)" with value "(.*)"/,
  (property: keyof RequestInit, value: any) => {
    if (!options.init) {
      options.init = {};
    }
    options.init[property] = value;
  },
);

Given(/an init parameter header "(.*)" with value "(.*)"/, (property: string, value: any) => {
  if (!options.init) {
    options.init = {};
  }
  if (!options.init.headers) {
    options.init.headers = {};
  }
  (options.init.headers as Dictionary<string>)[property] = value;
});

Given(/a jsonBody (?:"|')(.*)(?:"|')/, (stringifiedJsonBody: string) => {
  options.jsonBody = JSON.parse(stringifiedJsonBody);
});

When('calling buildRequestInit', () => {
  result = buildRequestInit(method!, options);
});

Then(
  /the returned object contains a "(.*)" property with value (?:"|')(.*)(?:"|')/,
  (property: keyof RequestInit, value: string) => {
    expect(Object.keys(result!)).to.contain(property);
    expect(result![property]).to.equal(value);
  },
);

Then(
  /the returned object contains a "(.*)" header with value "(.*)"/,
  (property: string, value: string) => {
    expect(result!.headers).not.to.equal(undefined);
    expect(Object.keys(result!.headers!)).to.contain(property);
    expect((result!.headers as Dictionary<string>)[property]).to.equal(value);
  },
);
