import { HttpOptions } from '../types';
const isAbsolutePath = new RegExp('^(?:[a-z]+:)?//', 'i');

export function joinUrl(url: string | URL, httpOptions?: HttpOptions): string {
  let joinedUrl = url; // default state

  if (
    typeof httpOptions?.baseUrl === 'string' &&
    typeof url === 'string' &&
    isAbsolutePath.test(url) === false
  ) {
    let baseUrl = httpOptions.baseUrl;
    let relativeUrl = url;
    // if user adds "/" in front this code removes it. "/api" => "api"
    if (relativeUrl.startsWith('/')) {
      relativeUrl = relativeUrl.slice(1);
    }
    // if user forgot to add "/" at the end of the baseUrl this code will add it. "https://www.google.com" => "https://www.google.com/"
    if (baseUrl.endsWith('/') === false) {
      baseUrl = baseUrl.concat('/');
    }
    joinedUrl = baseUrl.concat(relativeUrl);
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
