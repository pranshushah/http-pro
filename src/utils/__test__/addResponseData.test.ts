import { addDataInResponse } from '../addResponseData';
import { object, string, ZodError } from 'zod';
import { object as O, string as S, ValidationError } from 'yup';
import { validateYupSchema, validateZodSchema } from '@http-pro/validator';

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

it('should throw zod error', async () => {
  try {
    const response = new Response(JSON.stringify({ name: 'mit' }));
    await addDataInResponse(response, {
      headers: new Headers(),
      fetch: globalThis.fetch,
      validationFunction: validateZodSchema(),
      validationSchema: object({ name: string().min(10) }),
    });
  } catch (e) {
    expect(e).toBeInstanceOf(ZodError);
  }
});

it('should throw yup error', async () => {
  try {
    const response = new Response(JSON.stringify({ name: 'mit' }));
    await addDataInResponse(response, {
      headers: new Headers(),
      fetch: globalThis.fetch,
      validationFunction: validateYupSchema(),
      validationSchema: O().shape({ name: S().min(10) }),
    });
  } catch (e) {
    expect(e).toBeInstanceOf(ValidationError);
  }
});

it('should return raw value after validation', async () => {
  const responseData = { name: ' mit ' };
  const response = new Response(JSON.stringify(responseData));
  const { data } = await addDataInResponse(response, {
    headers: new Headers(),
    fetch: globalThis.fetch,
    validationFunction: validateZodSchema(),
    validationSchema: object({ name: string() }),
  });
  expect(data).toEqual(responseData);
});

it('should return parsed value after validation', async () => {
  const response = new Response(JSON.stringify({ name: ' mit ' }));
  const { data } = await addDataInResponse(response, {
    headers: new Headers(),
    fetch: globalThis.fetch,
    validationOptions: { raw: false },
    validationFunction: validateZodSchema(),
    validationSchema: object({ name: string().trim() }),
  });
  expect(data).toEqual({ name: 'mit' });
});
