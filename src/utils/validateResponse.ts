import { HttpProError } from '../Error';
import { HttpOptions } from '../types';

export async function validateResponse(
  httpOptions: HttpOptions | undefined,
  response: Response,
  request: Request
) {
  if (typeof httpOptions?.validateStatus === 'function') {
    if (httpOptions.validateStatus(response.status)) {
      if (typeof httpOptions?.interceptors?.afterResponse === 'function') {
        const tempResponse = await httpOptions.interceptors.afterResponse(
          response,
          request
        );
        if (tempResponse instanceof globalThis.Response) {
          response = tempResponse;
        }
      }
      return response;
    } else {
      const httpProError = await httpProErrorHandler(
        request,
        response,
        httpOptions
      );
      throw httpProError;
    }
  } else {
    if (response.ok) {
      if (typeof httpOptions?.interceptors?.afterResponse === 'function') {
        const tempResponse = await httpOptions.interceptors.afterResponse(
          response,
          request
        );
        if (tempResponse instanceof globalThis.Response) {
          response = tempResponse;
        }
      }
      return response;
    } else {
      const httpProError = await httpProErrorHandler(
        request,
        response,
        httpOptions
      );
      throw httpProError;
    }
  }
}

async function httpProErrorHandler(
  request: Request,
  response: Response,
  httpOptions: HttpOptions | undefined
) {
  let httpProError = new HttpProError(response, request);
  if (typeof httpOptions?.interceptors?.beforeError === 'function') {
    const tempHttpProError = await httpOptions.interceptors.beforeError(
      httpProError
    );
    if (tempHttpProError instanceof HttpProError) {
      httpProError = tempHttpProError;
    }
  }
  return httpProError;
}
