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

describe('Testing post method with differnet properties', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });
  it('should get basic Response with given-json', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ name: 'pranshu' }));
    const response = await httpClient.post('https://www.x.com');
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
    const res = await httpClient.post(url);
    expect(await res.json()).toEqual({ name: 'pranshu' });
    expect(fetchMock).toBeCalledTimes(1);
  });
  it('should concat baseUrl on relative url', async () => {
    const originalFetch = globalThis.fetch;
    globalThis.fetch = async (input: Request | string) => {
      if (typeof input !== 'object') {
        throw new TypeError('Expect to have an object request');
      }
      expect(input.method).toBe('POST');
      return new Response(input.url);
    };
    const res = await httpClient.post('/api', {
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
      expect(input.method).toBe('POST');
      return new Response(input.url);
    };
    const res = await httpClient.post('https://www.x.com', {
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
      expect(input.method).toBe('POST');
      return new Response(input.url);
    };
    const res = await httpClient.post(new URL('https://www.x.com'), {
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
      await httpClient.post('https://www.x.com');
    } catch (error) {
      expect(error instanceof HttpError).toBeTruthy();
      try {
        const request = new Request('https://www.x.com');
        await httpClient.post(request);
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
      let res = await httpClient.post('https://www.x.com', {
        validateStatus(status) {
          return status < 500;
        },
      });
      expect(res.status).toBe(401);
      const request = new Request('https://www.x.com');
      res = await httpClient.post(request, {
        validateStatus(status) {
          return status < 500;
        },
      });
    } catch (error) {
      expect(error instanceof HttpError).toBeFalsy();
    }
  });
});

describe('extend the instance', () => {
  it('should extend the current custom instance', async () => {
    const customHttpClient = httpClient.create({
      baseUrl: 'https://www.google.com',
    });
    const extendedClient = customHttpClient.extend({
      baseUrl: 'https://www.x.com',
    });
    const originalFetch = globalThis.fetch;
    globalThis.fetch = async input => {
      if (typeof input !== 'object') {
        throw new TypeError('Expect to have an object request');
      }

      return new Response(input.url);
    };
    const res = await extendedClient.get('');
    expect(await res.text()).toBe('https://www.x.com/');
    const res1 = await customHttpClient.get('');
    expect(await res1.text()).toBe('https://www.google.com/');
    globalThis.fetch = originalFetch;
  });
  it('should have 3 headers', async () => {
    const customHttpClient = httpClient.create({
      baseUrl: 'https://www.google.com',
      headers: { 'x-name': 'pranshu', 'x-lastname': 'shah' },
    });
    const extendedClient = customHttpClient.extend({
      baseUrl: 'https://www.x.com',
      headers: { 'x-name': 'mit', 'x-age': 'twentyfive' },
    });
    const originalFetch = globalThis.fetch;
    globalThis.fetch = async (input: Request | string) => {
      if (typeof input !== 'object') {
        throw new TypeError('Expect to have an object request');
      }
      expect(input.headers.get('x-name')).toBe('mit');
      expect(input.headers.get('x-age')).toBe('twentyfive');
      expect(input.headers.get('x-lastname')).toBe('shah');

      return new Response(input.url);
    };
    await extendedClient.get('https://www.google.com');
    globalThis.fetch = originalFetch;
  });
  it('should have 2 headers', async () => {
    const customHttpClient = httpClient.create({
      baseUrl: 'https://www.google.com',
      headers: { 'x-name': 'pranshu', 'x-lastname': 'shah' },
    });
    customHttpClient.extend({
      baseUrl: 'https://www.x.com',
      headers: { 'x-name': 'mit', 'x-age': 'twentyfive' },
    });
    const originalFetch = globalThis.fetch;
    globalThis.fetch = async (input: Request | string) => {
      if (typeof input !== 'object') {
        throw new TypeError('Expect to have an object request');
      }
      expect(input.headers.get('x-name')).toBe('pranshu');
      expect(input.headers.get('x-lastname')).toBe('shah');

      return new Response(input.url);
    };
    await customHttpClient.get('https://www.google.com');
    globalThis.fetch = originalFetch;
  });
  it('should have 4 headers', async () => {
    const customHttpClient = httpClient.create({
      baseUrl: 'https://www.google.com',
      headers: { 'x-name': 'pranshu', 'x-lastname': 'shah' },
    });
    const extendedClient = customHttpClient.extend({
      baseUrl: 'https://www.x.com',
      headers: { 'x-name': 'mit', 'x-age': 'twentyfive' },
    });
    const originalFetch = globalThis.fetch;
    globalThis.fetch = async (input: Request | string) => {
      if (typeof input !== 'object') {
        throw new TypeError('Expect to have an object request');
      }
      expect(input.headers.get('x-name')).toBe('kartik');
      expect(input.headers.get('x-age')).toBe('twentyfive');
      expect(input.headers.get('x-lastname')).toBe('shah');
      expect(input.headers.get('x-father')).toBe('TR');
      return new Response(input.url);
    };
    await extendedClient.get('https://www.google.com', {
      headers: { 'x-father': 'TR', 'x-name': 'kartik' },
    });
    globalThis.fetch = originalFetch;
  });
});
