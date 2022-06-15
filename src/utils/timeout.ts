import { TimeoutError } from '..';

/**
 * @description if given promises does not resolves in given time it throws error.
 * @param fetchRequest Promise you want timeout.
 * @param timeout value of timeout in milisecond.
 */
export async function timeout<T extends unknown>(
  fetchRequest: Promise<T>,
  timeout: number,
  request: Request
): Promise<T> {
  const abortController = new globalThis.AbortController();

  return (await Promise.race([
    waitForTime(timeout, request),
    fetchRequest,
  ])) as Promise<T>;
}

function waitForTime(ms: number, request: Request) {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject(new TimeoutError(request, ms));
    }, ms);
  });
}
