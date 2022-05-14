import { HttpOptions } from '../types';

export function stringifyJson(headers: Headers, httpOptions?: HttpOptions) {
  if (httpOptions?.json) {
    httpOptions.body = JSON.stringify(httpOptions.json);
    headers.set('content-type', 'application/json');
    delete httpOptions.json;
  }
}
