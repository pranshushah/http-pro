import { HttpOptions } from '../types';

export function getRequestTimeout(httpOptions?: HttpOptions) {
  let requestTimeout: number | undefined = undefined;
  if (httpOptions?.timeout && typeof httpOptions.timeout === 'number') {
    requestTimeout = httpOptions.timeout;
    delete httpOptions?.timeout;
  }
  return requestTimeout;
}
