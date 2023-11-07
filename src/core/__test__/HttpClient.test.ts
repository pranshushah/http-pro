import fetchMock from 'jest-fetch-mock';
import { hp } from '../../index';
import { HttpProError, TimeoutError } from '../../Error';
describe('Testing get method with differnet properties', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });
  it('should get basic Response with given-json', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ name: 'pranshu' }));
    const response = await hp.get('https://www.x.com');
    const data = await response.json();
    expect(data).toEqual({ name: 'pranshu' });
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });
  it('should work with request object', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ name: 'pranshu' }));
    const request = new Request('https://www.x.com');
    const res = await hp.get(request);
    expect(await res.json()).toEqual({ name: 'pranshu' });
    expect(fetchMock).toBeCalledTimes(1);
  });
  it('should work with URL object', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ name: 'pranshu' }));
    const url = new URL('https://www.x.com');
    const res = await hp.get(url);
    expect(await res.json()).toEqual({ name: 'pranshu' });
    expect(fetchMock).toBeCalledTimes(1);
  });
  it('should concat baseUrl on relative url', async () => {
    const customFetch = async (input: RequestInfo) => {
      if (typeof input !== 'object') {
        throw new TypeError('Expect to have an object request');
      }

      return new Response(input.url);
    };
    const res = await hp.get('/api', {
      baseUrl: 'https://www.google.com',
      fetch: customFetch,
    });
    const url = await res.text();
    expect(url).toBe('https://www.google.com/api');
  });

  it('should not concat baseUrl on absoulte url', async () => {
    const customFetch = async (input: RequestInfo) => {
      if (typeof input !== 'object') {
        throw new TypeError('Expect to have an object request');
      }

      return new Response(input.url);
    };
    const res = await hp.get('https://www.x.com', {
      baseUrl: 'https://www.google.com',
      fetch: customFetch,
    });
    const url = await res.text();
    expect(url).toBe('https://www.x.com/');
  });
  it('should not concat baseUrl on URL object', async () => {
    const customFetch = async (input: RequestInfo) => {
      if (typeof input !== 'object') {
        throw new TypeError('Expect to have an object request');
      }

      return new Response(input.url);
    };
    const res = await hp.get(new URL('https://www.x.com'), {
      baseUrl: 'https://www.google.com',
      fetch: customFetch,
    });
    const url = await res.text();
    expect(url).toBe('https://www.x.com/');
  });
  it('should throw HttpProError', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ name: 'pranshu' }), {
      status: 401,
      statusText: 'Unauthorized',
    });
    try {
      await hp.get('https://www.x.com');
    } catch (error) {
      expect(error instanceof HttpProError).toBeTruthy();
      try {
        const request = new Request('https://www.x.com');
        await hp.get(request);
      } catch (error1) {
        expect(error1 instanceof HttpProError).toBeTruthy();
      }
    }
  });
  it('should not throw HttpProError', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ name: 'pranshu' }), {
      status: 401,
      statusText: 'Unauthorized',
    });
    try {
      let res = await hp.get('https://www.x.com', {
        validateStatus(status) {
          return status < 500;
        },
      });
      expect(res.status).toBe(401);
      const request = new Request('https://www.x.com');
      res = await hp.get(request, {
        validateStatus(status) {
          return status < 500;
        },
      });
    } catch (error) {
      expect(error instanceof HttpProError).toBeFalsy();
    }
  });
});

describe('Testing post method with differnet properties', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });
  it('should get basic Response with given-json', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ name: 'pranshu' }));
    const response = await hp.post('https://www.x.com');
    const data = await response.json();
    expect(data).toEqual({ name: 'pranshu' });
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });
  it('should work with request object', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ name: 'pranshu' }));
    const request = new Request('https://www.x.com');
    const res = await hp.post(request);
    expect(await res.json()).toEqual({ name: 'pranshu' });
    expect(fetchMock).toBeCalledTimes(1);
  });
  it('should work with URL object', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ name: 'pranshu' }));
    const url = new URL('https://www.x.com');
    const res = await hp.post(url);
    expect(await res.json()).toEqual({ name: 'pranshu' });
    expect(fetchMock).toBeCalledTimes(1);
  });
  it('should concat baseUrl on relative url', async () => {
    const customFetch = async (input: RequestInfo) => {
      if (typeof input !== 'object') {
        throw new TypeError('Expect to have an object request');
      }

      return new Response(input.url);
    };
    const res = await hp.post('/api', {
      baseUrl: 'https://www.google.com',
      fetch: customFetch,
    });
    const url = await res.text();
    expect(url).toBe('https://www.google.com/api');
  });

  it('should not concat baseUrl on absoulte url', async () => {
    const customFetch = async (input: RequestInfo) => {
      if (typeof input !== 'object') {
        throw new TypeError('Expect to have an object request');
      }

      return new Response(input.url);
    };
    const res = await hp.post('https://www.x.com', {
      baseUrl: 'https://www.google.com',
      fetch: customFetch,
    });
    const url = await res.text();
    expect(url).toBe('https://www.x.com/');
  });
  it('should not concat baseUrl on URL object', async () => {
    const customFetch = async (input: RequestInfo) => {
      if (typeof input !== 'object') {
        throw new TypeError('Expect to have an object request');
      }

      return new Response(input.url);
    };
    const res = await hp.post(new URL('https://www.x.com'), {
      baseUrl: 'https://www.google.com',
      fetch: customFetch,
    });
    const url = await res.text();
    expect(url).toBe('https://www.x.com/');
  });
  it('should throw HttpProError', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ name: 'pranshu' }), {
      status: 401,
      statusText: 'Unauthorized',
    });
    try {
      await hp.post('https://www.x.com');
    } catch (error) {
      expect(error instanceof HttpProError).toBeTruthy();
      try {
        const request = new Request('https://www.x.com');
        await hp.post(request);
      } catch (error1) {
        expect(error1 instanceof HttpProError).toBeTruthy();
      }
    }
  });
  it('should not throw HttpProError', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ name: 'pranshu' }), {
      status: 401,
      statusText: 'Unauthorized',
    });
    try {
      let res = await hp.post('https://www.x.com', {
        validateStatus(status) {
          return status < 500;
        },
      });
      expect(res.status).toBe(401);
      const request = new Request('https://www.x.com');
      res = await hp.post(request, {
        validateStatus(status) {
          return status < 500;
        },
      });
    } catch (error) {
      expect(error instanceof HttpProError).toBeFalsy();
    }
  });
});

describe('Testing put method with differnet properties', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });
  it('should get basic Response with given-json', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ name: 'pranshu' }));
    const response = await hp.put('https://www.x.com');
    const data = await response.json();
    expect(data).toEqual({ name: 'pranshu' });
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });
  it('should work with request object', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ name: 'pranshu' }));
    const request = new Request('https://www.x.com');
    const res = await hp.put(request);
    expect(await res.json()).toEqual({ name: 'pranshu' });
    expect(fetchMock).toBeCalledTimes(1);
  });
  it('should work with URL object', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ name: 'pranshu' }));
    const url = new URL('https://www.x.com');
    const res = await hp.put(url);
    expect(await res.json()).toEqual({ name: 'pranshu' });
    expect(fetchMock).toBeCalledTimes(1);
  });
  it('should concat baseUrl on relative url', async () => {
    const customFetch = async (input: RequestInfo) => {
      if (typeof input !== 'object') {
        throw new TypeError('Expect to have an object request');
      }

      return new Response(input.url);
    };
    const res = await hp.put('/api', {
      baseUrl: 'https://www.google.com',
      fetch: customFetch,
    });
    const url = await res.text();
    expect(url).toBe('https://www.google.com/api');
  });
});

describe('Testing patch method with differnet properties', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });
  it('should get basic Response with given-json', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ name: 'pranshu' }));
    const response = await hp.patch('https://www.x.com');
    const data = await response.json();
    expect(data).toEqual({ name: 'pranshu' });
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });
  it('should work with request object', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ name: 'pranshu' }));
    const request = new Request('https://www.x.com');
    const res = await hp.patch(request);
    expect(await res.json()).toEqual({ name: 'pranshu' });
    expect(fetchMock).toBeCalledTimes(1);
  });
  it('should work with URL object', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ name: 'pranshu' }));
    const url = new URL('https://www.x.com');
    const res = await hp.patch(url);
    expect(await res.json()).toEqual({ name: 'pranshu' });
    expect(fetchMock).toBeCalledTimes(1);
  });
  it('should concat baseUrl on relative url', async () => {
    const customFetch = async (input: RequestInfo) => {
      if (typeof input !== 'object') {
        throw new TypeError('Expect to have an object request');
      }

      return new Response(input.url);
    };
    const res = await hp.patch('/api', {
      baseUrl: 'https://www.google.com',
      fetch: customFetch,
    });
    const url = await res.text();
    expect(url).toBe('https://www.google.com/api');
  });
});

describe('Testing delete method with differnet properties', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });
  it('should get basic Response with given-json', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ name: 'pranshu' }));
    const response = await hp.delete('https://www.x.com');
    const data = await response.json();
    expect(data).toEqual({ name: 'pranshu' });
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });
  it('should work with request object', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ name: 'pranshu' }));
    const request = new Request('https://www.x.com');
    const res = await hp.delete(request);
    expect(await res.json()).toEqual({ name: 'pranshu' });
    expect(fetchMock).toBeCalledTimes(1);
  });
  it('should work with URL object', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ name: 'pranshu' }));
    const url = new URL('https://www.x.com');
    const res = await hp.delete(url);
    expect(await res.json()).toEqual({ name: 'pranshu' });
    expect(fetchMock).toBeCalledTimes(1);
  });
  it('should concat baseUrl on relative url', async () => {
    const customFetch = async (input: RequestInfo) => {
      if (typeof input !== 'object') {
        throw new TypeError('Expect to have an object request');
      }

      return new Response(input.url);
    };
    const res = await hp.delete('/api', {
      baseUrl: 'https://www.google.com',
      fetch: customFetch,
    });
    const url = await res.text();
    expect(url).toBe('https://www.google.com/api');
  });
});

describe('extend the instance', () => {
  it('should extend the current custom instance', async () => {
    const customHp = hp.create({
      baseUrl: 'https://www.google.com',
    });
    const extendedClient = customHp.extend({
      baseUrl: 'https://www.x.com',
    });
    const customFetch = async (input: RequestInfo) => {
      if (typeof input !== 'object') {
        throw new TypeError('Expect to have an object request');
      }

      return new Response(input.url);
    };
    const res = await extendedClient.get('', { fetch: customFetch });
    expect(await res.text()).toBe('https://www.x.com/');
    const res1 = await customHp.get('', { fetch: customFetch });
    expect(await res1.text()).toBe('https://www.google.com/');
  });
  it('should have 3 headers', async () => {
    const customHttpAgent = hp.create({
      baseUrl: 'https://www.google.com',
      headers: { 'x-name': 'pranshu', 'x-lastname': 'shah' },
    });
    const extendedClient = customHttpAgent.extend({
      baseUrl: 'https://www.x.com',
      headers: { 'x-name': 'mit', 'x-age': 'twentyfive' },
    });
    const customFetch = async (input: Request | string) => {
      if (typeof input !== 'object') {
        throw new TypeError('Expect to have an object request');
      }
      expect(input.headers.get('x-name')).toBe('mit');
      expect(input.headers.get('x-age')).toBe('twentyfive');
      expect(input.headers.get('x-lastname')).toBe('shah');

      return new Response(input.url);
    };
    await extendedClient.get('https://www.google.com', { fetch: customFetch });
  });
  it('should have 2 headers', async () => {
    const customHttpAgent = hp.create({
      baseUrl: 'https://www.google.com',
      headers: { 'x-name': 'pranshu', 'x-lastname': 'shah' },
    });
    customHttpAgent.extend({
      baseUrl: 'https://www.x.com',
      headers: { 'x-name': 'mit', 'x-age': 'twentyfive' },
    });
    const customFetch = async (input: Request | string) => {
      if (typeof input !== 'object') {
        throw new TypeError('Expect to have an object request');
      }
      expect(input.headers.get('x-name')).toBe('pranshu');
      expect(input.headers.get('x-lastname')).toBe('shah');

      return new Response(input.url);
    };
    await customHttpAgent.get('https://www.google.com', { fetch: customFetch });
  });
  it('should have 4 headers', async () => {
    const customHttpAgent = hp.create({
      baseUrl: 'https://www.google.com',
      headers: { 'x-name': 'pranshu', 'x-lastname': 'shah' },
    });
    const extendedClient = customHttpAgent.extend({
      baseUrl: 'https://www.x.com',
      headers: { 'x-name': 'mit', 'x-age': 'twentyfive' },
    });
    const customFetch = async (input: Request | string) => {
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
      fetch: customFetch,
    });
  });
});

describe('should work with interceptors', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });
  it('should work with create object', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ name: 'pranshu' }));
    async function afterResponse(res: Response) {
      expect(res instanceof Response).toBe(true);
      return res;
    }
    function beforeRequest(req: Request) {
      expect(req instanceof Request).toBe(true);
      expect(req.url).toBe('https://www.x.com/');
      return req;
    }
    const hpInstance = hp.create({
      interceptors: { afterResponse, beforeRequest },
    });
    const response = await hpInstance.get('https://www.x.com');
    const data = await response.json();
    expect(data).toEqual({ name: 'pranshu' });
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });
  it('should run error interceptor', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ name: 'pranshu' }), {
      status: 400,
      statusText: 'bad request',
    });
    function beforeError(error: HttpProError | TimeoutError) {
      if (error instanceof HttpProError) {
        expect(error.response.status).toBe(400);
      }
      return error;
    }
    const hpInstance = hp.create({
      interceptors: { beforeError },
      validateStatus(status) {
        return status < 500;
      },
    });
    await hpInstance.get('https://www.x.com');
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });
});

describe('checking searchParams', () => {
  it('should add searchParams ', async () => {
    const customFetch = async (input: Request | string) => {
      if (typeof input !== 'object') {
        throw new TypeError('Expect to have an object request');
      }
      expect(input.url).toBe('https://www.x.com/api?name=pranshu&age=25');
      return new Response(input.url);
    };
    await hp.get('https://www.x.com/api', {
      searchParams: new URLSearchParams({ name: 'pranshu', age: '25' }),
      fetch: customFetch,
    });
  });
  it('should add searchParam with baseURL', async () => {
    const customFetch = async (input: Request | string) => {
      if (typeof input !== 'object') {
        throw new TypeError('Expect to have an object request');
      }
      expect(input.url).toBe('https://www.x.com/api?name=pranshu&age=25');
      return new Response(input.url);
    };
    await hp.get('/api', {
      baseUrl: 'https://www.x.com',
      searchParams: new URLSearchParams({ name: 'pranshu', age: '25' }),
      fetch: customFetch,
    });
  });
});
