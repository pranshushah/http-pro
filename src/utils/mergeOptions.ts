import { HttpOptions } from '../types';

export function mergeHeaders(
  extendedHeaders: HeadersInit = {},
  baseHeaders: HeadersInit = {}
) {
  const result = new Headers(baseHeaders);
  const extendedHeadersObject = new Headers(extendedHeaders);
  //@ts-ignore
  for (const [key, val] of extendedHeadersObject.entries()) {
    result.set(key, val);
  }
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
