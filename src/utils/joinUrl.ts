import { HttpOptions } from '../types';
const isAbsolutePath = new RegExp('^(?:[a-z]+:)?//', 'i');

export function joinUrl(url: string, httpOptions?: HttpOptions) {
  let joinedUrl = url;
  if (
    typeof httpOptions?.baseUrl === 'string' &&
    isAbsolutePath.test(url) === false
  ) {
    joinedUrl = httpOptions.baseUrl.concat(url);
    delete httpOptions.baseUrl;
  }
  return joinedUrl;
}
