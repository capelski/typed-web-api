import { HttpMethods } from './http-methods';

export const isValidMethod = (method: string) => {
  return (Object.values(HttpMethods) as string[]).includes(method);
};
