import { HttpOptions } from '../types';
const isAbsolutePath = new RegExp('^(?:[a-z]+:)?//', 'i');

export function joinUrl(url: string | URL, httpOptions?: HttpOptions): string {
  let joinedUrl = url; // default state

  if (
    typeof httpOptions?.baseUrl === 'string' &&
    typeof url === 'string' &&
    isAbsolutePath.test(url) === false
  ) {
    joinedUrl = httpOptions.baseUrl.concat(url);
    delete httpOptions.baseUrl;
  } else if (
    httpOptions?.baseUrl instanceof URL &&
    typeof url === 'string' &&
    isAbsolutePath.test(url) === false
  ) {
    let relativeUrl = url;
    if (relativeUrl.startsWith('/')) {
      relativeUrl = relativeUrl.slice(1);
    }
    joinedUrl = httpOptions.baseUrl + relativeUrl;
  }
  return joinedUrl.toString();
}
