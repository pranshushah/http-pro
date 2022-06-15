import { InternalHttpOptions } from '../..';
import { timeout } from '../timeout';

beforeEach(() => {
  fetchMock.resetMocks();
});

it('should resolve the promise', async () => {
  fetchMock.mockResponseOnce(JSON.stringify({ name: 'pranshu' }));
  jest.useFakeTimers();
  jest.spyOn(global, 'setTimeout');

  const abortController = new globalThis.AbortController();
  const httpOptions: InternalHttpOptions = {
    fetch: globalThis.fetch,
    headers: new Headers(),
  };
  const res = await timeout(
    new Request('https://www.x.com', { signal: abortController.signal }),
    httpOptions,
    abortController,
    10000
  );
  const data = await res.json();

  expect(data).toEqual({ name: 'pranshu' });

  jest.clearAllTimers();
});

it('should reject the promise', () => {
  fetchMock.mockResponseOnce(
    () =>
      new Promise(resolve => setTimeout(() => resolve({ body: 'ok' }), 1000))
  );

  const abortController = new globalThis.AbortController();
  const httpOptions: InternalHttpOptions = {
    fetch: globalThis.fetch,
    headers: new Headers(),
  };
  expect(
    timeout(
      new Request('https://www.x.com', { signal: abortController.signal }),
      httpOptions,
      abortController,
      100
    )
  ).rejects.toMatch('error');
});

export function async_delay<T>(delay: number, x?: T): Promise<T | undefined> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(x);
    }, delay);
  });
}
