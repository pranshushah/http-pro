import { HttpOptions } from '../../types';
import { joinUrl } from '../joinUrl';

it('should prefix the baseUrl', () => {
  let httpOptions: HttpOptions = { baseUrl: 'https://www.x.com' };
  let joinedUrl = joinUrl('/api', httpOptions);
  expect(joinedUrl).toBe('https://www.x.com/api');

  joinedUrl = joinUrl('api', httpOptions);
  expect(joinedUrl).toBe('https://www.x.com/api');

  httpOptions = { baseUrl: 'https://www.x.com/' };
  joinedUrl = joinUrl('/api', httpOptions);
  expect(joinedUrl).toBe('https://www.x.com/api');

  joinedUrl = joinUrl('api', httpOptions);
  expect(joinedUrl).toBe('https://www.x.com/api');
});

it('should return url string', () => {
  try {
    joinUrl('/api');
  } catch (e) {
    //@ts-ignore
    expect(e.name).toBe('TypeError');
  }
});

it('should return url back if pass URL object', () => {
  let joinedUrl = joinUrl(new URL('https://youtube.com'));
  if (joinedUrl instanceof URL) {
    expect(joinedUrl.href).toBe('https://youtube.com/');
  } else {
    expect(joinedUrl).toBe('https://youtube.com/');
  }
});

it('should return url back if pass URL object even if we pass prefix', () => {
  let joinedUrl = joinUrl(new URL('https://youtube.com'), {
    baseUrl: 'https://www.google.com',
  });
  if (joinedUrl instanceof URL) {
    expect(joinedUrl.href).toBe('https://youtube.com/');
  } else {
    expect(joinedUrl).toBe('https://youtube.com/');
  }
});

it('should return url string because url is absolute path', () => {
  const httpOptions: HttpOptions = { baseUrl: 'https://www.x.com' };
  let joinedUrl = joinUrl('https://www.y.com', httpOptions);
  expect(joinedUrl).toBe('https://www.y.com');
});

it('should concat url with baseURL even if we use URL object', () => {
  const httpOptions: HttpOptions = { baseUrl: new URL('https://www.x.com') };
  let joinedUrl = joinUrl('api', httpOptions);
  if (joinedUrl instanceof URL) {
    expect(joinedUrl.href).toBe('https://www.x.com/api');
    joinedUrl = joinUrl('/api/user?id=3', httpOptions);
    expect(joinedUrl).toBe('https://www.x.com/api/user?id=3');
  } else {
    expect(joinedUrl).toBe('https://www.x.com/api');
    joinedUrl = joinUrl('/api/user?id=3', httpOptions);
    expect(joinedUrl).toBe('https://www.x.com/api/user?id=3');
  }
});

it('should return url without join if we use URL object in url and baseURL', () => {
  const httpOptions: HttpOptions = { baseUrl: new URL('https://www.x.com') };
  let joinedUrl = joinUrl(new URL('https://www.google.com'), httpOptions);
  if (joinedUrl instanceof URL) {
    expect(joinedUrl.href).toBe('https://www.google.com/');
  } else {
    expect(joinedUrl).toBe('https://www.google.com/');
  }
});
