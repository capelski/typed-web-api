# @typed-web-api/express-server

Server library to validate the return type of an express web API's endpoints, based on a type declaration generated via `@typed-web-api/common`. Additionally, it can also be used to infer the types of the Http requests' payload.

## Example

Given the following sample express web API:

```typescript
import express from 'express';

const app = express();

/* ... */

app.post('/login', (req, res) => {
  /* ... */
  res.send(loginResponse);
});

app.get('/users' (req, res) => {
  /* ... */
  res.send(users);
});

app.get('/users/:userId', (req, res) => {
  /* ... */
  res.send(user);
});

app.listen(process.env.PORT || 3000);
```

This is how to validate the endpoints' return type by using `useServerEndpoints` (given a `WebApiTypes` types declaration):

```typescript
import { ServerEndpoints, useServerEndpoints } from '@typed-web-api/express-server';
import express from 'express';
import { WebApiTypes } from '...';

const app = express();

/* ... */

const endpoints: ServerEndpoints<WebApiTypes> = {
  '/login_post': (req, res) => {
    /* ... */
    return loginResponse; // Expected return type => LoginResponse;
  },
  '/users_get': (req, res) => {
    /* ... */
    return users; // Expected return type => User[]
  },
  '/users/:userId_get': (req, res) => {
    /* ... */
    return user; // Expected return type => User
  },
};

useServerEndpoints(app, endpoints);

app.listen(process.env.PORT || 3000);
```

Optionally the payload of the express request objects can be inferred as well by using additional helper types:

```typescript
const endpoints: ServerEndpoints<WebApiTypes> = {
  '/login_post': (req: TypedExpressRequest<WebApiTypes, '/login_post'>) => {
    const { email, password } = req.body; // email: string, password: string
    /* ... */
  },
  '/users_get': (req: TypedExpressRequest<WebApiTypes, '/users_get'>) => {
    const { limit, skip } = req.query; // limit: string, skip: string
    /* ... */
  },
  /* ... */
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
import { ServerEndpoints, useServerEndpoints } from '@typed-web-api/express-server';
import express from 'express';
import { WebApiTypes } from '...';

const app = express();
app.use(express.json());

useServerEndpoints(app, {
  '/login_post': (req, res) => {
    /* ... */
  },
  '/users_get': (req, res) => {
    /* ... */
  },
  '/users/:userId_get': (req, res) => {
    /* ... */
  },
});

app.listen(process.env.PORT || 3000);
```
