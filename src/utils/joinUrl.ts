import { HttpOptions } from '../types';
const isAbsolutePath = new RegExp('^(?:[a-z]+:)?//', 'i');

export function joinUrl(url: string | URL, httpOptions?: HttpOptions): string {
  let joinedUrl = url;
  if (
    typeof httpOptions?.baseUrl === 'string' &&
    typeof url === 'string' &&
    isAbsolutePath.test(url) === false
  ) {
    joinedUrl = httpOptions.baseUrl.concat(url);
    delete httpOptions.baseUrl;
  }
  return joinedUrl.toString();
}
