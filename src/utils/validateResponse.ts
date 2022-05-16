import { HttpError } from '../Error';
import { HttpOptions } from '../types';

export function validateResponse(
  httpOptions: HttpOptions | undefined,
  response: Response,
  request: Request
) {
  if (typeof httpOptions?.validateStatus === 'function') {
    if (httpOptions.validateStatus(response.status)) {
      return response;
    } else {
      throw new HttpError(response, request);
    }
  } else {
    if (response.ok) {
      return response;
    } else {
      throw new HttpError(response, request);
    }
  }
}
