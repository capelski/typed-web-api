import { After, Before, Given } from '@cucumber/cucumber';
import express, { Express } from 'express';
import sinon, { SinonStubbedInstance } from 'sinon';

export const appStub: { value: SinonStubbedInstance<Express> } = { value: undefined! };

Before(() => {
  appStub.value = undefined!;
});

Given('an express app', () => {
  appStub.value = sinon.stub(express());
});

After(() => {
  sinon.restore();
});
