import { InternalHttpOptions } from '../types';
import { timeout } from '../utils/timeout';

export async function executeRequest(
  request: globalThis.Request,
  options: InternalHttpOptions,
  abortController: AbortController
) {
  if (options.timeout && typeof options.timeout === 'number') {
    return await timeout(request, options, abortController, options.timeout);
  } else {
    return await options.fetch(request);
  }
}
