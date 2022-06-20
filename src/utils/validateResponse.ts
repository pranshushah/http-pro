import { HttpError } from '../Error/index.js';
import { HttpOptions } from '../types/index.js';

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
      if (typeof httpOptions?.interceptors?.beforeError === 'function') {
        await httpOptions.interceptors.beforeError(response, request);
      }
      throw new HttpError(response, request);
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
      if (typeof httpOptions?.interceptors?.beforeError === 'function') {
        await httpOptions.interceptors.beforeError(response, request);
      }
      throw new HttpError(response, request);
    }
  }
}
