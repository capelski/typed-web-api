import { HttpMethod } from '../http-method';

export function controllerFactory(httpMethod: typeof HttpMethod) {
  class RestController {
    @httpMethod()
    '/path/1_delete'() {}

    @httpMethod()
    '/path/2_get'() {}

    @httpMethod()
    '/path/3_patch'() {}

    @httpMethod()
    '/path/4_post'() {}

    @httpMethod()
    '/path/5_put'() {}
  }

  return RestController;
}
