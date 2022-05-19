import { HttpError } from '../Error';
import { HttpOptions } from '../types';

export function validateResponse(
  httpOptions: HttpOptions | undefined,
  response: Response,
  request: Request
) {
  if (typeof httpOptions?.validateStatus === 'function') {
    if (httpOptions.validateStatus(response.status)) {
      if (typeof httpOptions?.interceptors?.afterResponse === 'function') {
        const tempResponse = httpOptions.interceptors.afterResponse(
          response,
          request
        );
        if (tempResponse instanceof Response) {
          response = tempResponse;
        }
      }
      return response;
    } else {
      if (typeof httpOptions?.interceptors?.beforeError === 'function') {
        httpOptions.interceptors.beforeError(response, request);
      }
      throw new HttpError(response, request);
    }
  } else {
    if (response.ok) {
      if (typeof httpOptions?.interceptors?.afterResponse === 'function') {
        const tempResponse = httpOptions.interceptors.afterResponse(
          response,
          request
        );
        if (tempResponse instanceof Response) {
          response = tempResponse;
        }
      }
      return response;
    } else {
      if (typeof httpOptions?.interceptors?.beforeError === 'function') {
        httpOptions.interceptors.beforeError(response, request);
      }
      throw new HttpError(response, request);
    }
  }
}
