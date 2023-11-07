import { InternalHttpOptions, TimeoutError } from '../..';
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
      new Promise((resolve) => setTimeout(() => resolve({ body: 'ok' }), 1000))
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

it("should call beforeError interceptor if it's defined", async () => {
  fetchMock.mockResponseOnce(
    () =>
      new Promise((resolve) => setTimeout(() => resolve({ body: 'ok' }), 500))
  );

  const abortController = new globalThis.AbortController();
  const httpOptions: InternalHttpOptions = {
    fetch: globalThis.fetch,
    headers: new Headers(),
    interceptors: {
      beforeError(error) {
        expect(error).toBeInstanceOf(TimeoutError);
        return error;
      },
    },
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
