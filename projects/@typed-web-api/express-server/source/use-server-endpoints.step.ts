import { After, Before, Given, Then, When } from '@cucumber/cucumber';
import { HttpMethods } from '@typed-web-api/common';
import { expect } from 'chai';
import sinon, { SinonSpy } from 'sinon';
import * as expose from './expose-endpoint-handler';
import { appStub } from './express-app.step';
import { ServerEndpoints } from './server-endpoints';
import { useServerEndpoints, UseServerEndpointsResult } from './use-server-endpoints';

let endpoints: ServerEndpoints<any>;
let error: undefined | Error;
let exposeSpy: SinonSpy;
let result: UseServerEndpointsResult;

Before(() => {
  endpoints = undefined!;
  error = undefined;
  exposeSpy = sinon.spy(expose, 'exposeEndpointHandler');
  result = undefined!;
});

Given(/an endpoint "(.*)"/, (endpointName) => {
  if (!endpoints) {
    endpoints = {};
  }
  endpoints[endpointName] = () => ({ payload: 'X' });
});

When('calling useServerEndpoints', () => {
  result = useServerEndpoints(appStub.value, endpoints);
});

Then(
  /the endpoint "(.*)" is exposed with path "(.*)" and method "(delete|get|patch|post|put)"/,
  (endpointName: string, path: string, method: HttpMethods) => {
    const calls = exposeSpy.getCalls();
    const matchingCalls = calls.filter(
      (call) =>
        call.args[1] === method &&
        call.args[2] === path &&
        call.args[3] === endpoints[endpointName],
    );
    expect(matchingCalls.length).to.equal(1);
  },
);

Then(/the endpoint "(.*)" is NOT exposed/, (endpointName: string) => {
  const calls = exposeSpy.getCalls();
  const matchingCalls = calls.filter((call) => call.args[3] === endpoints[endpointName]);
  expect(matchingCalls.length).to.equal(0);
});

Then(
  /the returned successful endpoints list contains the endpoint "(.*)"/,
  (endpointName: string) => {
    expect(result.exposedEndpoints).to.contain(endpointName);
  },
);

Then(/the returned failed endpoints list contains the endpoint "(.*)"/, (endpointName: string) => {
  expect(result.failedEndpoints).to.contain(endpointName);
});

After(() => {
  sinon.restore();
});
