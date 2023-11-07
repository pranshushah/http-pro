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
      timeoutErrorHandler(request, timeout, options).then(reject);
    }, timeout);
    options
      .fetch(request)
      .then((response) => {
        clearTimeout(timeoutId);
        resolve(response);
      })
      .catch(reject);
  });
}

async function timeoutErrorHandler(
  request: Request,
  timeout: number,
  httpOptions: InternalHttpOptions | undefined
) {
  let timeoutError = new TimeoutError(request, timeout);
  if (typeof httpOptions?.interceptors?.beforeError === 'function') {
    const tempTimeoutError = await httpOptions.interceptors.beforeError(
      timeoutError
    );
    if (tempTimeoutError instanceof TimeoutError) {
      timeoutError = tempTimeoutError;
    }
  }
  return timeoutError;
}
