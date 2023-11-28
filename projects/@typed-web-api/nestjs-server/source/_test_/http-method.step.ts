import { After, Before, Given, Then } from '@cucumber/cucumber';
import { Delete, Get } from '@nestjs/common';
import { expect } from 'chai';
import sinon, { SinonSpy } from 'sinon';
import { HttpMethodCore } from '../http-method-core';

let error: undefined | Error;
let stubs:
  | undefined
  | {
      Delete: SinonSpy<[path?: string | string[] | undefined], MethodDecorator>;
      Get: SinonSpy<[path?: string | string[] | undefined], MethodDecorator>;
      Patch: SinonSpy<[path?: string | string[] | undefined], MethodDecorator>;
      Post: SinonSpy<[path?: string | string[] | undefined], MethodDecorator>;
      Put: SinonSpy<[path?: string | string[] | undefined], MethodDecorator>;
    };

Before(() => {
  error = undefined;
  stubs = {
    Delete: sinon.spy(Delete),
    Get: sinon.spy(Get),
    Patch: sinon.spy(Get),
    Post: sinon.spy(Get),
    Put: sinon.spy(Get),
  };
});

Given(/the class defined in "(.*)"/, (filename: string) => {
  const { controllerFactory } = require(filename);
  try {
    controllerFactory(HttpMethodCore(stubs!));
  } catch (_error) {
    error = _error as Error;
  }
});

Then(
  /the "(Delete|Get|Patch|Post|Put)" NestJS decorator is called with "(.*)"/,
  (decoratorName: 'Delete' | 'Get' | 'Patch' | 'Post' | 'Put', path: string) => {
    const calls = stubs![decoratorName].getCalls().filter((call) => call.args[0] === path);
    expect(calls.length).to.equal(1);
  },
);

Then(
  /the "(Delete|Get|Patch|Post|Put)" NestJS decorator is NOT called/,
  (decoratorName: 'Delete' | 'Get' | 'Patch' | 'Post' | 'Put') => {
    const calls = stubs![decoratorName].getCalls();
    expect(calls.length).to.equal(0);
  },
);

Then(/an error is thrown containing "(.*)" in the message/, (methodName: string) => {
  expect(error).not.to.equal(undefined);
  expect(error!.message).to.contain(methodName);
});

After(() => {
  sinon.restore();
});
