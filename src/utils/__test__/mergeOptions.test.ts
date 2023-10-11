import { HttpOptions, Interceptors } from '../../types';
import { mergeOptions } from '../mergeOptions';

it('should merge headers and config', () => {
  const headers1 = { 'x-name': 'pranshu', 'x-lastname': 'shah' };
  const headers2 = { 'x-name': 'mit' };
  const options1: HttpOptions = { headers: headers1, method: 'GET' };
  const options2: HttpOptions = {
    headers: headers2,
    mode: 'cors',
    method: 'POST',
  };
  const mergedOptions = mergeOptions(options2, options1);
  // headers always will be headerObject
  //@ts-ignore
  expect(mergedOptions.headers.get('x-lastname')).toBe('shah');
  //@ts-ignore
  expect(mergedOptions.headers.get('x-name')).toBe('mit');
  expect(mergedOptions.method).toBe('POST');
});

it('should merge interceptors', () => {
  const interceptors: Interceptors = {
    beforeRequest(request: Request) {
      return request;
    },
    afterResponse(response: Response) {
      return response;
    },
  };
  function afterResponse(res: Response) {
    return res;
  }
  const option1: HttpOptions = { interceptors };
  const option2: HttpOptions = {
    interceptors: {
      afterResponse,
      beforeError() {},
    },
  };
  const mergedOptions = mergeOptions(option2, option1);
  expect(mergedOptions.interceptors?.afterResponse).toBe(afterResponse);
  expect(typeof mergedOptions.interceptors?.beforeError).toBe('function');
  expect(typeof mergedOptions.interceptors?.beforeRequest).toBe('function');
});

it('should merge validationOptions', () => {
  const validationOptions1 = { mode: 'async', raw: true } as const;
  const validationOptions2 = { mode: 'sync' } as const;
  const options1: HttpOptions = { validationOptions: validationOptions1 };
  const options2: HttpOptions = { validationOptions: validationOptions2 };
  const mergedOptions = mergeOptions(options2, options1);
  expect(mergedOptions.validationOptions?.mode).toBe('sync');
  expect(mergedOptions.validationOptions?.raw).toBe(true);
});
