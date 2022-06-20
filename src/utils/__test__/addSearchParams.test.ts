import { joinUrl } from '../joinUrl';
import type { InternalHttpOptions } from '../../types';
import { addSearchParams } from '../addSearchParams';
it('should join url with searchParams', () => {
  const httpOptions: InternalHttpOptions = {
    headers: new Headers(),
    baseUrl: new URL('https://www.x.com'),
    searchParams: { name: 'pranshu', lastname: 'shah', age: 25 },
    fetch: globalThis.fetch,
  };
  let joinedUrl = joinUrl('api', httpOptions);
  const urlWithParams = addSearchParams(joinedUrl, httpOptions);
  if (urlWithParams instanceof URL) {
    expect(urlWithParams.href).toBe(
      'https://www.x.com/api?name=pranshu&lastname=shah&age=25'
    );
  } else {
    expect(urlWithParams).toBe(
      'https://www.x.com/api?name=pranshu&lastname=shah&age=25'
    );
  }
});

it('should join url with searchParams', () => {
  const httpOptions: InternalHttpOptions = {
    headers: new Headers(),
    baseUrl: new URL('https://www.x.com'),
    searchParams: { name: 'pranshu', lastname: 'shah', age: 25 },
    fetch: globalThis.fetch,
  };
  let joinedUrl = joinUrl('https://www.y.com/api', httpOptions);
  const urlWithParams = addSearchParams(joinedUrl, httpOptions);

  if (urlWithParams instanceof URL) {
    expect(urlWithParams.href).toBe(
      'https://www.y.com/api?name=pranshu&lastname=shah&age=25'
    );
  } else {
    expect(urlWithParams).toBe(
      'https://www.y.com/api?name=pranshu&lastname=shah&age=25'
    );
  }
});
