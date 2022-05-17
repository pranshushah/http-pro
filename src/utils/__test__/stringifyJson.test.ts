import { HttpOptions } from '../../types';
import { stringifyJson } from '../stringifyJson';

it('should add the stringify version of the json object in body', () => {
  const httpOptions: HttpOptions = {
    json: { x: 3, y: 'pranshu' },
    headers: new Headers(),
  };
  stringifyJson(httpOptions);
  expect(httpOptions.json).toBe(undefined);
  expect(typeof httpOptions.body).toBe('string');
  //@ts-ignore
  expect(httpOptions.headers.get('content-type')).toBe('application/json');
});

it('should have body as undefined', () => {
  const httpOptions: HttpOptions = {
    headers: new Headers(),
  };
  stringifyJson(httpOptions);
  //@ts-ignore
  expect(httpOptions.headers.has('content-type')).toBeFalsy();
});
