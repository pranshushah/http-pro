import {
  HValidationOptions,
  HttpOptions,
  Interceptors,
  InternalHttpOptions,
} from '../types';

export function mergeHeaders(
  extendedHeaders: HeadersInit = {},
  baseHeaders: HeadersInit = {}
) {
  const result = new globalThis.Headers(baseHeaders);
  const extendedHeadersObject = new globalThis.Headers(extendedHeaders);
  extendedHeadersObject.forEach((value, key) => {
    result.set(key, value);
  });
  return result;
}

export function mergeInterceptors(
  extendedInterceptors: Interceptors = {},
  baseInterceptors: Interceptors = {}
) {
  let result = { ...baseInterceptors };
  let source = { ...extendedInterceptors };
  let key: keyof Interceptors;
  for (key in source) {
    //@ts-ignore
    result[key] = extendedInterceptors[key];
  }
  return result;
}

export function mergeValidationOptions(
  extendedValidation: HValidationOptions = {},
  baseValidation: HValidationOptions = {}
) {
  return { ...baseValidation, ...extendedValidation };
}

export function mergeOptions<ResponseData extends any = any>(
  extendedOptions: HttpOptions = {},
  baseOptions: HttpOptions = {}
) {
  const headers = mergeHeaders(extendedOptions.headers, baseOptions.headers);
  const interceptors = mergeInterceptors(
    extendedOptions.interceptors,
    baseOptions.interceptors
  );

  const validationOptions = mergeValidationOptions(
    extendedOptions.validationOptions,
    baseOptions.validationOptions
  );

  const mergedOptions: InternalHttpOptions<ResponseData> = {
    ...baseOptions,
    ...extendedOptions,
    headers,
    interceptors,
    validationOptions,
    fetch: extendedOptions.fetch
      ? extendedOptions.fetch
      : baseOptions.fetch
      ? baseOptions.fetch
      : globalThis.fetch.bind(globalThis),
  };
  return mergedOptions;
}
