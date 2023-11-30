import { After, Before, Given, Then, When } from '@cucumber/cucumber';
import { HttpMethods } from '@typed-web-api/common';
import { expect } from 'chai';
import sinon, { SinonSpy } from 'sinon';
import * as expose from './expose-endpoint-handler';
import { appStub } from './express-app.step';
import { ServerEndpoints } from './server-endpoints';
import { useServerEndpoints, UseServerEndpointsResult } from './use-server-endpoints';

let endpoints: undefined | ServerEndpoints<any>;
let error: undefined | Error;
let exposeSpy: SinonSpy;
let result: undefined | UseServerEndpointsResult;

Before(() => {
  endpoints = undefined;
  error = undefined;
  exposeSpy = sinon.spy(expose, 'exposeEndpointHandler');
  result = undefined;
});

Given(/an endpoint "(.*)"/, (endpointName) => {
  if (!endpoints) {
    endpoints = {};
  }
  endpoints[endpointName] = () => ({ payload: 'X' });
});

When('calling useServerEndpoints', () => {
  result = useServerEndpoints(appStub.value!, endpoints!);
});

When(
  /calling useServerEndpoints with failOnInvalidNames set to "(true|false)"/,
  (failOnInvalidNames: boolean) => {
    try {
      result = useServerEndpoints(appStub.value!, endpoints!, { failOnInvalidNames });
    } catch (_error) {
      error = _error as Error;
    }
  },
);

Then(
  /the endpoint "(.*)" is exposed with path "(.*)" and method "(delete|get|patch|post|put)"/,
  (endpointName: string, path: string, method: HttpMethods) => {
    const calls = exposeSpy.getCalls();
    const matchingCalls = calls.filter(
      (call) =>
        call.args[1] === method &&
        call.args[2] === path &&
        call.args[3] === endpoints![endpointName],
    );
    expect(matchingCalls.length).to.equal(1);
  },
);

Then(/the endpoint "(.*)" is NOT exposed/, (endpointName: string) => {
  const calls = exposeSpy.getCalls();
  const matchingCalls = calls.filter((call) => call.args[3] === endpoints![endpointName]);
  expect(matchingCalls.length).to.equal(0);
});

Then(/the returned endpoint list contains a successful endpoint "(.*)"/, (endpointName: string) => {
  expect(result!.successfulEndpoints).to.contain(endpointName);
});

Then(/the returned endpoint list contains a failed endpoint "(.*)"/, (endpointName: string) => {
  expect(Object.keys(result!.failedEndpoints)).to.contain(endpointName);
});

Then('an error is thrown', () => {
  expect(error).not.to.equal(undefined);
});

Then(/the error contains "(.*)"/, (message: string) => {
  expect(error!.message).to.contain(message);
});

After(() => {
  sinon.restore();
});
