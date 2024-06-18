# @typed-web-api/client

Client library to infer the return type of fetch requests based on a web API's type declaration generated via `@typed-web-api/common`.

## Example

Given the following sample `fetch` call:

```typescript
/* ... */

const response = await fetch(`/users`, { method: 'get' });
const users = await response.json(); // Inferred type => any
```

This is how to get typed response payloads by using `typedFetch` (given the sample `WebApiEndpoints` type described in [@typed-web-api/common](https://www.npmjs.com/package/@typed-web-api/common)):

```typescript
import { getTypedFetch } from '@typed-web-api/client';
import { WebApiEndpoints } from '...';

const typedFetch = getTypedFetch<WebApiEndpoints>();

/* ... */

const response = await typedFetch('/users_get');
const users = await response.json(); // Inferred type => User[]
```

## API

### getTypedFetch\<TApi\>([options])

#### Returns

An instance of [typedFetch](#typedfetchendpointname-options), configured for the `TApi` type.

#### Arguments

- **TApi**: Web API's type declaration.
- **options**:

  | name    | type             | default      | description                                                      |
  | ------- | ---------------- | ------------ | ---------------------------------------------------------------- |
  | baseUrl | string?          | `undefined`  | A string that will be prepended to the URL of all fetch requests |
  | fetch   | Window['fetch']? | `this.fetch` | A function that issues Http requests                             |

#### Examples

```javascript
const typedFetch = getTypedFetch<MyApiType>();
const typedFetch = getTypedFetch<MyApiType>({ baseUrl: '/api' });
const typedFetch = getTypedFetch<MyApiType>({ fetch: nodeFetch });
```

---

### typedFetch(endpointName, [options])

#### Returns

A promise of an Http response, with a `.json()` method typed according to the `TApi` provided in the parent function (i.e. [getTypedFetch](#gettypedfetchtapioptions)).

#### Arguments

- **endpointName**: The target web API endpoint name (e.g. `/users_get`).
- **options**:

  | name      | type         | default     | description                                                                                                                                         |
  | --------- | ------------ | ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
  | init      | RequestInit? | `undefined` | RequestInit properties that will be passed to the fetch call (except for the `method` and conditional overrides depending on the provided options). |
  | urlPrefix | string?      | `undefined` | A string that will be prepended to the endpoint URL.                                                                                                |

  For endpoints with typed request payload (i.e. endpoint definitions that use `JsonBody`, `QueryString` and/or `UrlParams`), additional parameters are available:

  | name        | type                                 | default     | description                                                                                                                                                  |
  | ----------- | ------------------------------------ | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
  | jsonBody    | `extends any`                        | `undefined` | Object that will be stringified and sent as the request body. When provided, the `Content-Type` header will be will set/overwritten with `application/json`. |
  | queryString | `extends { [key: string]: string }?` | `undefined` | Key-value dictionary with query string parameters to be added to the URL.                                                                                    |
  | urlParams   | `extends { [key: string]: string }?` | `undefined` | Key-value dictionary with parameters to be replaced in the URL.                                                                                              |

#### Examples

```typescript
const users = await typedFetch('/users_get');
const usersPage = await typedFetch('/users_get', { queryString: { limit: '30', skip: '30' } });

const loginResponse = await typedFetch('/users/login_post', {
  jsonBody: { email: '...', password: '...' },
});

const user = await typedFetch('/users/:userId_get', { urlParams: { userId: 'xyz' } });
```
