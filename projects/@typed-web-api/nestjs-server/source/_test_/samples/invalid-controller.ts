import { HttpMethod } from '../../http-method';

export function controllerFactory(httpMethod: typeof HttpMethod) {
  class InvalidController {
    @httpMethod()
    '/path_invalidMethod'() {}
  }

  return InvalidController;
}
