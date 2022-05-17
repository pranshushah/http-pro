import { HttpOptions } from '../types';

export function stringifyJson(httpOptions: HttpOptions) {
  if (httpOptions?.json) {
    httpOptions.body = JSON.stringify(httpOptions.json);
    //headers always will be Header object
    //@ts-ignore
    httpOptions.headers.set('content-type', 'application/json');
    delete httpOptions.json;
  }
}
