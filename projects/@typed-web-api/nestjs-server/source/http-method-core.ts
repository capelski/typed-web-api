import { Delete, Get, Patch, Post, Put } from '@nestjs/common';
import { splitPathMethod } from '@typed-web-api/common';

// Internal function meant for testing purposes
export const HttpMethodCore =
  (decorators: {
    Delete: typeof Delete;
    Get: typeof Get;
    Patch: typeof Patch;
    Post: typeof Post;
    Put: typeof Put;
  }) =>
  () => {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
      const { method, path } = splitPathMethod(propertyKey);

      const httpDecorator =
        method === 'delete'
          ? decorators.Delete
          : method === 'get'
            ? decorators.Get
            : method === 'patch'
              ? decorators.Patch
              : method === 'post'
                ? decorators.Post
                : decorators.Put;

      return httpDecorator(path)(target, propertyKey, descriptor);
    };
  };
