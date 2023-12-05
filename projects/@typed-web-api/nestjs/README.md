# @typed-web-api/nestjs

Server library to validate the return type of a NestJS web API's endpoints, based on a type declaration generated via `@typed-web-api/common`.

## Example

Given the following sample NestJS controller:

```typescript
import { Controller, Get, Post } from '@nestjs/common';

@Controller()
export class SampleController {
  @Get('/users')
  getUsers() {
    /* ... */
    return users;
  }

  @Get('users/:userId')
  getUserById() {
    /* ... */
    return user;
  }

  @Post('/login')
  login() {
    /* ... */
    return loginResponse;
  }
}
```

This is how to validate the endpoints' return type by using `ServerEndpoints` (given a `WebApiTypes` types declaration) and `HttpMethod`:

```typescript
import { Controller } from '@nestjs/common';
import { HttpMethod, ServerEndpoints } from '@typed-web-api/nestjs';
import { WebApiTypes } from '...';

@Controller()
export class SampleController implements ServerEndpoints<WebApiTypes> {
  @HttpMethod()
  '/users_get'() {
    /* ... */
    return users; // Expected return type => User[];
  }

  @HttpMethod()
  '/users/:userId_get'() {
    /* ... */
    return user; // Expected return type => User;
  }

  @HttpMethod()
  '/login_post'() {
    /* ... */
    return loginResponse; // Expected return type => LoginResponse;
  }
}
```
