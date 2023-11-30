import { HttpMethod } from '../http-method';

export function controllerFactory(httpMethod: typeof HttpMethod) {
  class NoController {
    '/path/1_delete'() {}

    '/path/2_get'() {}

    '/path/3_patch'() {}

    '/path/4_post'() {}

    '/path/5_put'() {}
  }

  // Incorrect usage of httpMethod
  httpMethod();

  return NoController;
}
