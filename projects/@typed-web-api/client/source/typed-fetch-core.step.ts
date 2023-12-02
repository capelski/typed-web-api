import { After, Before, Given, Then, When } from '@cucumber/cucumber';
import { HttpMethods } from '@typed-web-api/common';
import { expect } from 'chai';
import sinon, { SinonSpy } from 'sinon';
import * as buildRequestInit from './build-request-init';
import * as buildUrl from './build-url';
import { getTypedFetchCore } from './typed-fetch-core';

let buildRequestInitSpy: undefined | SinonSpy;
let buildUrlSpy: undefined | SinonSpy;
let endpointName: undefined | string;
let fetchDependency: undefined | SinonSpy;
let options: any;
let typedFetch: undefined | ReturnType<typeof getTypedFetchCore<any>>;

Before(() => {
  buildRequestInitSpy = sinon.spy(buildRequestInit, 'buildRequestInit');
  buildUrlSpy = sinon.spy(buildUrl, 'buildUrl');
  endpointName = undefined;
  fetchDependency = undefined;
  options = undefined;
  typedFetch = undefined;
});

Given('an instance of typedFetch with a fetchDependency handler', () => {
  fetchDependency = sinon.spy();
  typedFetch = getTypedFetchCore(fetchDependency);
});

Given(
  /an instance of typedFetch with a fetchDependency handler and a base url "(.*)"/,
  (baseUrl: string) => {
    fetchDependency = sinon.spy();
    typedFetch = getTypedFetchCore(fetchDependency, { baseUrl });
  },
);

Given(/an endpoint "(.*)"/, (_endpointName: string) => {
  endpointName = _endpointName;
});

Given('an options object', () => {
  options = {
    jsonBody: {},
    init: {},
    queryString: {},
    urlParams: {},
    urlPrefix: 'prefix',
  };
});

When('calling typedFetch', () => {
  typedFetch!(endpointName!, options);
});

Then(
  /the fetchDependency handler is called with path "(.*)" and method "(delete|get|patch|post|put)"/,
  (path: string, method: HttpMethods) => {
    const calls = fetchDependency!.getCalls();
    const matchingCalls = calls.filter(
      (call) => call.args[0] === path && call.args[1]?.method === method,
    );
    expect(matchingCalls.length).to.equal(1);
  },
);

Then(
  /the buildRequestInit method is called with method "(delete|get|patch|post|put)" and all options/,
  (method: HttpMethods) => {
    const calls = buildRequestInitSpy!.getCalls();
    const matchingCalls = calls.filter(
      (call) =>
        call.args[0] === method &&
        Object.keys(options).every((key) => call.args[1][key] === options[key]),
    );
    expect(matchingCalls.length).to.equal(1);
  },
);

Then(
  /the buildUrl method is called with path "(.*)", all options and base url "(.*)"/,
  (path: string, baseUrl: string) => {
    const calls = buildUrlSpy!.getCalls();
    const matchingCalls = calls.filter(
      (call) =>
        call.args[0] === path &&
        Object.keys(options).every((key) => call.args[1][key] === options[key]) &&
        call.args[1].baseUrl === baseUrl,
    );
    expect(matchingCalls.length).to.equal(1);
  },
);

After(() => {
  sinon.restore();
});
