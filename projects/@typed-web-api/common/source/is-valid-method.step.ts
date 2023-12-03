import { Before, Given, Then } from '@cucumber/cucumber';
import { expect } from 'chai';
import { isValidMethod } from './is-valid-method';

let method: string;

Before(() => {
  method = undefined!;
});

Given(/an endpoint method "(.*)"/, (_method: string) => {
  method = _method;
});

Then(/calling isValidEndpoint returns "(true|false)"/, (result: string) => {
  expect(String(isValidMethod(method))).to.equal(result);
});
