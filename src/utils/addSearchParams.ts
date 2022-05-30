import { InternalHttpOptions, _BaseSearchParamsInit } from '../types';

export function addSearchParams(
  url: string | URL,
  httpOptions?: InternalHttpOptions
) {
  let finalURL = url;
  if (httpOptions?.searchParams) {
    // i don't know it throws error even if types are correct.
    // TODO: remove ts-ignore
    //@ts-ignore
    const urlWithParams = new URL(url);
    const params = new URLSearchParams(
      httpOptions?.searchParams as _BaseSearchParamsInit
    );
    params.forEach((value, key) => {
      urlWithParams.searchParams.append(key, value);
    });
    finalURL = urlWithParams;
  }
  return finalURL;
}
