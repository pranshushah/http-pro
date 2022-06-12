import { addDataInResponse } from '../addResponseData';

it('should work with json response', async () => {
  const response = new Response(JSON.stringify({ name: 'pranshu' }));
  const resWithData = await addDataInResponse(response, {
    headers: new Headers(),
    fetch: globalThis.fetch,
  });
  expect(resWithData.data).toEqual({ name: 'pranshu' });
});

it('should work with text response', async () => {
  const response = new Response('hello');
  const resWithData = await addDataInResponse<string>(response, {
    headers: new Headers(),
    fetch: globalThis.fetch,
    responseType: 'text',
  });
  expect(resWithData.data).toBe('hello');
});
