# @typed-web-api/nestjs

Server library to validate the return type of a NestJS web API's endpoints, based on a type declaration generated via `@typed-web-api/common`.

## Example

Given the following sample NestJS controller:

```typescript
import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';

@Controller('/users')
export class UsersController {
  @Post('/login')
  async login(@Body() body: { email: string; password: string }) {
    /* ... */
    return loginResponse;
  }

  @Get('/')
  async getUsers(@Query() query: { limit?: string; skip?: string }) {
    /* ... */
    return users;
  }

  @Get('/:userId')
  async getUserById(@Param('userId') userId: string) {
    /* ... */
    return user;
  }
}
```

This is how to validate the endpoints' return type by using `HttpMethod` and `ServerEndpoints` (given the sample `UserEndpoints` type described in [@typed-web-api/common](https://www.npmjs.com/package/@typed-web-api/common)):

```typescript
import { Body, Controller, Param, Query } from '@nestjs/common';
import { HttpMethod, ServerEndpoints } from '@typed-web-api/nestjs';
import { UserEndpoints } from '...';

@Controller()
export class UsersController implements ServerEndpoints<UserEndpoints> {
  @HttpMethod()
  async '/users/login_post'(@Body() body: { email: string; password: string }) {
    /* ... */
    return loginResponse; // Expected return type => LoginResponse;
  }

  @HttpMethod()
  async '/users_get'(@Query() query: { limit?: string; skip?: string }) {
    /* ... */
    return users; // Expected return type => User[];
  }

  @HttpMethod()
  async '/users/:userId_get'(@Param('userId') userId: string) {
    /* ... */
    return user; // Expected return type => User;
  }
}
```
