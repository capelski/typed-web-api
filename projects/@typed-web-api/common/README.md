# @typed-web-api/common

Base types to generate an opinionated type declaration for a nodeJS web API. Such type declaration can later be used in both client (`@typed-web-api/client`) and server (`@typed-web-api/express` or `@typed-web-api/nestjs`) sides to validate the payload and response of Http requests.

## Example

Given a sample web API with three endpoints (`POST /users/login`, `GET /users`, `GET /users/:userId`), this is what the type declaration would look like:

```typescript
import { EndpointDefinition } from '@typed-web-api/common';
import { LoginResponse, User } from '...';

export type UserEndpoints = {
  '/users/login_post': EndpointDefinition<LoginResponse>;
  '/users_get': EndpointDefinition<User[]>;
  '/users/:userId_get': EndpointDefinition<User>;
};

export type WebApiEndpoints = UserEndpoints & /* ... */;
```

Optionally the payload of the Http requests can be validated as well by using additional helper types:

```typescript
import { EndpointDefinition, JsonBody, QueryString, UrlParams } from '@typed-web-api/common';
import { LoginResponse, User } from '...';

export type UserEndpoints = {
  '/users/login_post': EndpointDefinition<LoginResponse, JsonBody<{ email: string; password: string }>>;
  '/users_get': EndpointDefinition<User[], QueryString<{ limit?: string; skip?: string }>>;
  '/users/:userId_get': EndpointDefinition<User, UrlParams<{ userId: string }>>;
};

export type WebApiEndpoints = UserEndpoints & /* ... */;
```
