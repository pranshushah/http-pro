import { InternalHttpOptions, TimeoutError } from '..';

/**
 * @description if given promises does not resolves in given time it throws error.
 * @param fetchRequest Promise you want timeout.
 * @param timeout value of timeout in milisecond.
 */
export async function timeout(
  request: Request,
  options: InternalHttpOptions,
  abortController: AbortController,
  timeout: number
): Promise<Response> {
  return new Promise((resolve, reject) => {
    const timeoutId = setTimeout(() => {
      abortController.abort();
      reject(new TimeoutError(request, timeout));
    }, timeout);
    options
      .fetch(request)
      .then(response => {
        clearTimeout(timeoutId);
        resolve(response);
      })
      .catch(reject);
  });
}
