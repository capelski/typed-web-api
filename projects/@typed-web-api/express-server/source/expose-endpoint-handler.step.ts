import { After, Before, Given, Then, When } from '@cucumber/cucumber';
import { HttpMethods } from '@typed-web-api/common';
import { expect } from 'chai';
import { NextFunction, Request, RequestHandler, Response } from 'express';
import sinon, { SinonStubbedInstance } from 'sinon';
import { exposeEndpointHandler } from './expose-endpoint-handler';
import { appStub } from './express-app.step';
import { EndpointHandler } from './server-endpoints';

let handler: undefined | EndpointHandler<any>;
let handlerSpy: undefined | sinon.SinonSpy;
let nextFunction: undefined | NextFunction;
let request: undefined | Request;
let response: undefined | SinonStubbedInstance<Response>;
let wrapper: undefined | RequestHandler;

Before(() => {
  handler = undefined;
  handlerSpy = undefined;
  nextFunction = undefined;
  request = undefined;
  response = undefined;
  wrapper = undefined;
});

Given('a handler', () => {
  handler = () => ({ payload: 'sample' });
  handlerSpy = sinon.spy(handler);
});

Given(/a handler that returns a payload "(.*)"/, (payload: string) => {
  handler = () => ({ payload });
  handlerSpy = sinon.spy(handler);
});

Given(/a handler that returns a status "(.*)"/, (status: string) => {
  handler = () => ({ payload: 'sample', status: parseInt(status) });
  handlerSpy = sinon.spy(handler);
});

When(
  /calling exposeEndpointHandler with method "(delete|get|patch|post|put)" and path "(.*)"/,
  (method: HttpMethods, path: string) => {
    wrapper = exposeEndpointHandler(appStub.value!, method, path, handlerSpy!);
  },
);

When('an HTTP request arrives after having called exposeEndpointHandler', () => {
  wrapper = exposeEndpointHandler(appStub.value!, HttpMethods.delete, '/any', handlerSpy!);

  nextFunction = () => {};
  request = {} as Request;
  response = sinon.stub({
    send: (_payload: any) => {},
    status: (_status: number) => {},
  } as Response);

  wrapper!(request, response, nextFunction);
});

Then(
  /the "(delete|get|patch|post|put)" method of the express app is called with path "(.*)"/,
  (method: HttpMethods, path: string) => {
    const calls = appStub.value![method].getCalls();
    const matchingCalls = calls.filter((call) => call.args[0] === path);
    expect(matchingCalls.length).to.equal(1);
  },
);

Then('the handler is called with the express request, response and next parameters', () => {
  const call = handlerSpy!.getCall(0);
  expect(call.args[0]).to.equal(request);
  expect(call.args[1]).to.equal(response);
  expect(call.args[2]).to.equal(nextFunction);
});

Then(/the send method of the express response is called with "(.*)"/, (payload: string) => {
  const call = response!.send.getCall(0);
  expect(call.args[0]).to.equal(payload);
});

Then(/the status method of the express response is called with "(.*)"/, (status: string) => {
  const call = response!.status.getCall(0);
  expect(call.args[0]).to.equal(parseInt(status));
});

Then('the status method of the express response is NOT called', () => {
  const calls = response!.status.getCalls();
  expect(calls.length).to.equal(0);
});

After(() => {
  sinon.restore();
});
