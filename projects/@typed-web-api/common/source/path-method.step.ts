import { Before, Given, Then, When } from '@cucumber/cucumber';
import { expect } from 'chai';
import { HttpMethods, PathMethod, splitPathMethod } from './path-method';

let error: any;
let inputString: string | undefined;
let result: PathMethod | undefined;

Before(() => {
  error = undefined;
  inputString = undefined;
  result = undefined;
});

Given(/the string "(.*)"/, (value: string) => {
  inputString = value;
});

When('calling splitPathMethod', () => {
  try {
    result = splitPathMethod(inputString!);
  } catch (e) {
    error = e;
  }
});

Then(/the returned path is "(.*)"/, (path: string) => {
  expect(result && result.path).to.equal(path);
});

Then(/the returned method is "(.*)"/, (method: HttpMethods) => {
  expect(result && result.method).to.equal(method);
});

Then(/an error is raised containing "(.*)" in the message/, (errorMessage: string) => {
  expect(error && error.message).to.contain(errorMessage);
});
