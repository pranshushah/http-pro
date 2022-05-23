import { InternalHttpOptions } from '../types';
import { responseTypes } from './constant';

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
