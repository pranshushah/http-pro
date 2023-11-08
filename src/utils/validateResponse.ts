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
      throw new HttpProError(response, request);
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
      throw new HttpProError(response, request);
    }
  }
}
