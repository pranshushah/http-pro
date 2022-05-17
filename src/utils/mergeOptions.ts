import { HttpOptions } from '../types';

export function mergeHeaders(
  extendedHeaders: HeadersInit = {},
  baseHeaders: HeadersInit = {}
) {
  const result = new Headers(baseHeaders);
  const extendedHeadersObject = new Headers(extendedHeaders);
  extendedHeadersObject.forEach((value, key) => {
    result.set(key, value);
  });
  return result;
}

export function mergeOptions(
  extendedOptions: HttpOptions = {},
  baseOptions: HttpOptions = {}
) {
  const headers = mergeHeaders(extendedOptions.headers, baseOptions.headers);
  const mergedOptions: HttpOptions = { ...baseOptions, ...extendedOptions };
  mergedOptions.headers = headers;
  return mergedOptions;
}
