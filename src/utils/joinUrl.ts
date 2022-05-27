import { HttpOptions, _BaseSearchParamsInit } from '../types';
const isAbsolutePath = new RegExp('^(?:[a-z]+:)?//', 'i');

export function joinUrl(
  url: string | URL,
  httpOptions?: HttpOptions
): string | URL {
  if (typeof url !== 'string' && url instanceof URL === false) {
    throw new TypeError('url must be string or URL object');
  }
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
  if (httpOptions?.searchParams) {
    // i don't know it throws error even if types are correct.
    // TODO: remove ts-ignore
    //@ts-ignore
    const urlWithParams = new URL(joinedUrl);
    const params = new URLSearchParams(
      httpOptions?.searchParams as _BaseSearchParamsInit
    );
    params.forEach((value, key) => {
      urlWithParams.searchParams.append(key, value);
    });
    joinedUrl = urlWithParams;
  }
  return joinedUrl;
}
