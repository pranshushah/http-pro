import { TimeoutError } from '../TimeoutError';

it('should have request,name and timeout property', () => {
  const request = new Request('https://www.google.com');
  const timeoutError = new TimeoutError(request, 100);
  expect(timeoutError.name).toBe('TimeoutError');
  expect(timeoutError.request).toBe(request);
  expect(timeoutError.timeout).toBe(100);
  expect(timeoutError.message).toBe('Request timed out in 100 miliseconds');
});
