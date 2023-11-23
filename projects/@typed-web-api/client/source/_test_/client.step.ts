import { After, Before, Given, Then, When } from '@cucumber/cucumber';
import { Dictionary, EndpointDefinition, JsonBody_UrlParams_QueryString } from '@typed-web-api/common';
import { expect } from 'chai';
import sinon, { SinonSpy } from 'sinon';
import { getTypedFetchCore } from '../typed-fetch-core';

type TestApi = {
  [path_method: string]: EndpointDefinition<any, JsonBody_UrlParams_QueryString<any, any, any>>;
};

let fetchSpy: SinonSpy;
let jsonBody: any;
let queryString: Dictionary<string>;
let urlParams: Dictionary<string>;
let requestInit: RequestInit;
let path_method: string;
let typedFetch: (...args: Parameters<ReturnType<typeof getTypedFetchCore<TestApi>>>) => any;

Before(() => {
  fetchSpy = undefined!;
  jsonBody = undefined;
  queryString = {};
  urlParams = {};
  requestInit = {
    headers: {
      'Content-Type': 'application/json',
    },
    // method: 'get',
  };
  path_method = undefined!;
  typedFetch = undefined!;
});

Given('an instance of typedFetch', () => {
  fetchSpy = sinon.spy();
  typedFetch = getTypedFetchCore<TestApi>(fetchSpy);
});

Given(/an instance of typedFetch with "(.*)" baseUrl/, (baseUrl: string) => {
  fetchSpy = sinon.spy();
  typedFetch = getTypedFetchCore<TestApi>(fetchSpy, { baseUrl });
});

Given(/an endpoint "(.*)"/, (value: string) => {
  path_method = value;
});

Given(/a RequestInit object "(.*)"/, (name: string) => {
  requestInit.method = name;
});

Given(/a query string parameter "(.*)" with value "(.*)"/, (name: string, value: string) => {
  queryString[name] = value;
});

Given(/a url parameter "(.*)" with value "(.*)"/, (name: string, value: string) => {
  urlParams[name] = value;
});

Given(
  /a body object containing a "(.*)" property with value "(.*)"/,
  (name: string, value: string) => {
    jsonBody = jsonBody || {};
    jsonBody[name] = value;
  },
);

When('calling typedFetch with the described parameters', () => {
  typedFetch(path_method, {
    init: requestInit,
    jsonBody,
    queryString,
    urlParams,
  });
});

Then('window.fetch is called', () => {
  const call = fetchSpy.getCall(0);
  expect(call).not.to.equal(null, `window.fetch was not called`);
});

Then(/gets url "(.*)" as first parameter/, (url: string) => {
  const call = fetchSpy.getCall(0);
  expect(call).not.to.equal(null, `window.fetch was not called`);

  expect(call.args[0]).to.equal(url);
});

Then(/gets RequestInit object "(.*)" as second parameter/, (name: string) => {
  const call = fetchSpy.getCall(0);
  expect(call).not.to.equal(null, `window.fetch was not called`);

  expect(call.args[1].method).to.equal(name);
});

Then(/gets '(.*)' as the body property of the second parameter/, (body: string) => {
  const call = fetchSpy.getCall(0);
  expect(call).not.to.equal(null, `window.fetch was not called`);

  expect(call.args[1].body).to.equal(body);
});

After(() => {
  sinon.restore();
});
