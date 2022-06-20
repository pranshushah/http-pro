import type { InternalHttpOptions } from '../types/index.js';
import { responseTypes } from './constant.js';

export function addAcceptHeader(httpOptions: InternalHttpOptions) {
  if (httpOptions.headers.has('accept') === false) {
    httpOptions.headers.set(
      'accept',
      responseTypes[
        httpOptions.responseType ? httpOptions.responseType : 'json'
      ]
    );
  }
}
