import { HttpProError } from '../HttpProError';

it('should have name,request and response properties', () => {
  const request = new Request('https://www.x.com');
  const response = new Response();
  const httpError = new HttpProError(response, request);
  expect(httpError.name).toBe('HttpProError');
  expect(httpError.request).toBe(request);
  expect(httpError.response).toBe(response);
  expect(httpError.message).toBe('Request failed with status code 200');
});
