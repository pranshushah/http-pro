import { InternalHttpOptions } from '../types';
import { responseTypes } from './constant';

export function stringifyJson(httpOptions: InternalHttpOptions) {
  if (httpOptions?.data) {
    httpOptions.body = JSON.stringify(httpOptions.data);
    if (httpOptions.headers.has('content-type') === false) {
      httpOptions.headers.set('content-type', responseTypes.json);
    }
    delete httpOptions.data;
  }
}
