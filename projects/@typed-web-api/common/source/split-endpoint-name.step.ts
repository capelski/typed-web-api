import { Before, Given, Then, When } from '@cucumber/cucumber';
import { expect } from 'chai';
import { EndpointProps } from './endpoint-props';
import { HttpMethods } from './http-methods';
import { splitEndpointName } from './split-endpoint-name';

let endpointName: string;
let result: EndpointProps;

Before(() => {
  endpointName = undefined!;
  result = undefined!;
});

Given(/the endpoint name "(.*)"/, (_endpointName: string) => {
  endpointName = _endpointName;
});

When('calling splitEndpointName', () => {
  result = splitEndpointName(endpointName);
});

Then(/the returned path is "(.*)"/, (path: string) => {
  expect(result.path).to.equal(path);
});

Then(/the returned method is "(.*)"/, (method: HttpMethods) => {
  expect(result.method).to.equal(method);
});
