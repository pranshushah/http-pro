import fetchMock from 'jest-fetch-mock';
import { InternalHttpOptions } from '../..';
import { executeRequest } from '../executeRequest';

beforeEach(() => {
  fetchMock.resetMocks();
});

it('should return response without timeout', async () => {
  fetchMock.mockResponseOnce(JSON.stringify({ name: 'pranshu' }));
  const request = new Request('https://www.google.com');
  const httpOptions: InternalHttpOptions = {
    fetch: globalThis.fetch,
    headers: new Headers(),
  };
  const res = await (await executeRequest(request, httpOptions)).json();
  expect(fetchMock).toHaveBeenCalledTimes(1);
  expect(res).toEqual({ name: 'pranshu' });
});

it('should return response with timeout parameter', async () => {
  jest.useFakeTimers();
  jest.spyOn(global, 'setTimeout');
  fetchMock.mockResponseOnce(JSON.stringify({ name: 'pranshu' }));
  const httpOptions: InternalHttpOptions = {
    fetch: globalThis.fetch,
    headers: new Headers(),
  };
  const request = new Request('https://www.google.com');
  const res = await (await executeRequest(request, httpOptions, 100)).json();
  expect(fetchMock).toHaveBeenCalledTimes(1);
  expect(res).toEqual({ name: 'pranshu' });
  jest.clearAllTimers();
});
