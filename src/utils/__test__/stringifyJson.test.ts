import { HttpOptions } from '../../types';
import { stringifyJson } from '../stringifyJson';

it('should add the stringify version of the json object in body', () => {
  const httpOptions: HttpOptions = {
    json: { x: 3, y: 'pranshu' },
  };
  const headers = new Headers();
  stringifyJson(headers, httpOptions);
  expect(httpOptions.json).toBe(undefined);
  expect(typeof httpOptions.body).toBe('string');
  expect(headers.get('content-type')).toBe('application/json');
});

it('should have body as undefined', () => {
  const headers = new Headers();
  stringifyJson(headers);
  expect(headers.has('content-type')).toBeFalsy();
});
