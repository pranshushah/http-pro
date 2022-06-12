import { InternalHttpOptions } from '../types';
import { timeout } from '../utils/timeout';

export async function executeRequest(
  request: globalThis.Request,
  options: InternalHttpOptions,
  requestTimeout?: number
) {
  if (requestTimeout && typeof requestTimeout === 'number') {
    return await timeout<Response>(
      options.fetch(request),
      requestTimeout,
      request
    );
  } else {
    return await options.fetch(request);
  }
}
