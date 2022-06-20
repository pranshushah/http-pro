import type { InternalHttpOptions } from '../../types';
import { stringifyJson } from '../stringifyJson';

it('should add the stringify version of the json object in body', () => {
  const httpOptions: InternalHttpOptions = {
    json: { x: 3, y: 'pranshu' },
    headers: new Headers(),
    fetch: globalThis.fetch,
  };
  stringifyJson(httpOptions);
  expect(httpOptions.json).toBe(undefined);
  expect(typeof httpOptions.body).toBe('string');
  expect(httpOptions.headers.get('content-type')).toBe('application/json');
});

it('should have body as undefined', () => {
  const httpOptions: InternalHttpOptions = {
    headers: new Headers(),
    fetch: globalThis.fetch,
  };
  stringifyJson(httpOptions);
  expect(httpOptions.headers.has('content-type')).toBeFalsy();
});
