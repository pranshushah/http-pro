import { HttpOptions } from '../../types';
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
