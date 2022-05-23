import { InternalHttpOptions } from '../types';
import { responseTypes } from './constant';

export function stringifyJson(httpOptions: InternalHttpOptions) {
  if (httpOptions?.json) {
    httpOptions.body = JSON.stringify(httpOptions.json);
    if (httpOptions.headers.has('content-type') === false) {
      httpOptions.headers.set('content-type', responseTypes.json);
    }
    delete httpOptions.json;
  }
}
