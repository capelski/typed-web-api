import { Delete, Get, Patch, Post, Put } from '@nestjs/common';
import { isValidMethod, splitEndpointName } from '@typed-web-api/common';

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
      const { method, path } = splitEndpointName(propertyKey);

      if (!isValidMethod(method)) {
        throw new Error(
          `Invalid endpoint name "${propertyKey}". Endpoint names must end with an underscore followed by an http method.` +
            ' Examples: /users/_get or /users/:id_put.',
        );
      }

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
