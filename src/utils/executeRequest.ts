import { timeout } from '../utils/timeout';

export async function executeRequest(
  request: Request,
  requestTimeout?: number
) {
  if (requestTimeout && typeof requestTimeout === 'number') {
    return await timeout<Response>(fetch(request), requestTimeout, request);
  } else {
    return await fetch(request);
  }
}
