import { timeout } from '../timeout';

it('should resolve the promise', () => {
  jest.useFakeTimers();
  jest.spyOn(global, 'setTimeout');
  expect(
    timeout(async_delay(1000, 33), 3000, new Request('https://www.x.com'))
  ).resolves.toBe(33);
  jest.clearAllTimers();
});

it('should reject the promise', () => {
  expect(
    timeout(async_delay(10000, 45), 1000, new Request('https://www.x.com'))
  ).rejects.toMatch('error');
});

export function async_delay<T>(delay: number, x?: T): Promise<T | undefined> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(x);
    }, delay);
  });
}
