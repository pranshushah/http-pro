import fetchMock from 'jest-fetch-mock';
import { httpClient } from '../../index';
import { HttpError } from '../../Error';
describe('Testing get method with differnet properties', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });
  it('should get basic Response with given-json', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ name: 'pranshu' }));
    const response = await httpClient.get('https://www.x.com');
    const data = await response.json();
    expect(data).toEqual({ name: 'pranshu' });
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });
  it('should work with request object', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ name: 'pranshu' }));
    const request = new Request('https://www.x.com');
    const res = await httpClient.get(request);
    expect(await res.json()).toEqual({ name: 'pranshu' });
    expect(fetchMock).toBeCalledTimes(1);
  });
  it('should work with URL object', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ name: 'pranshu' }));
    const url = new URL('https://www.x.com');
    const res = await httpClient.get(url);
    expect(await res.json()).toEqual({ name: 'pranshu' });
    expect(fetchMock).toBeCalledTimes(1);
  });
  it('should concat baseUrl on relative url', async () => {
    const originalFetch = globalThis.fetch;
    globalThis.fetch = async input => {
      if (typeof input !== 'object') {
        throw new TypeError('Expect to have an object request');
      }

      return new Response(input.url);
    };
    const res = await httpClient.get('/api', {
      baseUrl: 'https://www.google.com',
    });
    const url = await res.text();
    expect(url).toBe('https://www.google.com/api');
    globalThis.fetch = originalFetch;
  });

  it('should not concat baseUrl on absoulte url', async () => {
    const originalFetch = globalThis.fetch;
    globalThis.fetch = async input => {
      if (typeof input !== 'object') {
        throw new TypeError('Expect to have an object request');
      }

      return new Response(input.url);
    };
    const res = await httpClient.get('https://www.x.com', {
      baseUrl: 'https://www.google.com',
    });
    const url = await res.text();
    expect(url).toBe('https://www.x.com/');
    globalThis.fetch = originalFetch;
  });
  it('should not concat baseUrl on URL object', async () => {
    const originalFetch = globalThis.fetch;
    globalThis.fetch = async input => {
      if (typeof input !== 'object') {
        throw new TypeError('Expect to have an object request');
      }

      return new Response(input.url);
    };
    const res = await httpClient.get(new URL('https://www.x.com'), {
      baseUrl: 'https://www.google.com',
    });
    const url = await res.text();
    expect(url).toBe('https://www.x.com/');
    globalThis.fetch = originalFetch;
  });
  it('should throw HttpError', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ name: 'pranshu' }), {
      status: 401,
      statusText: 'Unauthorized',
    });
    try {
      await httpClient.get('https://www.x.com');
    } catch (error) {
      expect(error instanceof HttpError).toBeTruthy();
      try {
        const request = new Request('https://www.x.com');
        await httpClient.get(request);
      } catch (error1) {
        expect(error1 instanceof HttpError).toBeTruthy();
      }
    }
  });
  it('should not throw HttpError', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ name: 'pranshu' }), {
      status: 401,
      statusText: 'Unauthorized',
    });
    try {
      let res = await httpClient.get('https://www.x.com', {
        validateStatus(status) {
          return status < 500;
        },
      });
      expect(res.status).toBe(401);
      const request = new Request('https://www.x.com');
      res = await httpClient.get(request, {
        validateStatus(status) {
          return status < 500;
        },
      });
    } catch (error) {
      expect(error instanceof HttpError).toBeFalsy();
    }
  });
});
