# @typed-web-api/express

Server library to validate the return type of an express web API's endpoints, based on a type declaration generated via `@typed-web-api/common`. Additionally, it can also be used to infer the types of the Http requests' payload.

## Example

Given the following sample express web API:

```typescript
import express from 'express';

const app = express();

/* ... */

app.post('/users/login', async (req, res) => {
  /* ... */
  res.status(X).send(loginResponse);
});

app.get('/users' async (req, res) => {
  /* ... */
  res.send(users);
});

app.get('/users/:userId', async (req, res) => {
  /* ... */
  res.send(user);
});

app.listen(process.env.PORT || 3000);
```

This is how to validate the endpoints' return type by using `useServerEndpoints` (given the sample `UserEndpoints` type described in [@typed-web-api/common](https://www.npmjs.com/package/@typed-web-api/common)):

```typescript
import { ServerEndpoints, useServerEndpoints } from '@typed-web-api/express';
import express from 'express';
import { UserEndpoints } from '...';

const app = express();

/* ... */

const usersController: ServerEndpoints<UserEndpoints> = {
  '/users/login_post': async (req) => {
    /* ... */
    return { payload: loginResponse, status: X }; // Expected payload type => LoginResponse;
  },
  '/users_get': async (req) => {
    /* ... */
    return { payload: users }; // Expected payload type => User[]
  },
  '/users/:userId_get': async (req) => {
    /* ... */
    return { payload: user }; // Expected payload type => User
  },
};

useServerEndpoints(app, usersController);

app.listen(process.env.PORT || 3000);
```

Optionally the payload of the express request objects can be inferred as well by using additional helper types:

```typescript
const usersController: ServerEndpoints<UserEndpoints> = {
  '/users/login_post': async (req: TypedExpressRequest<UserEndpoints, '/users/login_post'>) => {
    const { email, password } = req.body; // email: string, password: string
    /* ... */
  },
  '/users_get': async (req: TypedExpressRequest<UserEndpoints, '/users_get'>) => {
    const { limit, skip } = req.query; // limit: string, skip: string
    /* ... */
  },
  '/users/:userId_get': async (req: TypedExpressRequest<UserEndpoints, '/users/:userId_get'>) => {
    const { userId } = req.params; // userId: string
    /* ... */
    return { payload: user }; // Expected payload type => User
  },
};
```

## API

### useServerEndpoints(appOrRouter, endpoints)

#### Returns

An object with a list of endpoints exposed successfully (i.e. `exposedEndpoints`) and a list of endpoints which failed to be exposed (i.e. `failedEndpoints`) due to invalid endpoint name.

#### Arguments

- **appOrRouter**: The `express()` or `express.Router()` instance where the endpoints will be exposed.
- **endpoints**: The endpoint handlers to be exposed.

#### Example

```typescript
import { ServerEndpoints, useServerEndpoints } from '@typed-web-api/express';
import express from 'express';
import { WebApiEndpoints } from '...';

const app = express();
app.use(express.json());

useServerEndpoints(app, <WebApiEndpoints>{
  '/users/login_post': (req, res, next) => {
    /* ... */
  },
  '/users_get': (req, res, next) => {
    /* ... */
  },
  '/users/:userId_get': (req, res, next) => {
    /* ... */
  },
});

app.listen(process.env.PORT || 3000);
```
