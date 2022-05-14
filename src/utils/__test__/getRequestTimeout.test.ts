import { HttpOptions } from '../../types';
import { getRequestTimeout } from '../getRequestTimeout';

it('should return the timeout in number', () => {
  const httpOptions: HttpOptions = { timeout: 100 };
  const requestTimeout = getRequestTimeout(httpOptions);
  expect(requestTimeout).toBe(100);
});

it('should return the undefined', () => {
  const requestTimeout = getRequestTimeout();
  expect(requestTimeout).toBe(undefined);
});

it('should return the undefined', () => {
  //testing this for javascript
  //@ts-ignore
  const httpOptions: HttpOptions = { timeout: [] };
  const requestTimeout = getRequestTimeout();
  expect(requestTimeout).toBe(undefined);
});
