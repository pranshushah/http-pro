import { InternalHttpOptions } from '../types';
import { timeout } from '../utils/timeout';

export async function executeRequest(
  request: globalThis.Request,
  options: InternalHttpOptions,
  abortController: AbortController
) {
  if (options.timeout && typeof options.timeout === 'number') {
    return await timeout<Response>(
      options.fetch(request),
      options.timeout,
      request
    );
  } else {
    return await options.fetch(request);
  }
}
