import { Delete, Get, Patch, Post, Put } from '@nestjs/common';
import { splitPathMethod } from '@typed-web-api/common';

export const HttpMethod = () => {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const { method, path } = splitPathMethod(propertyKey);

    const httpDecorator =
      method === 'delete'
        ? Delete
        : method === 'get'
          ? Get
          : method === 'patch'
            ? Patch
            : method === 'post'
              ? Post
              : Put;

    return httpDecorator(path)(target, propertyKey, descriptor);
  };
};
