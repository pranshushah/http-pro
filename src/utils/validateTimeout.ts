export function validateTimeout(timeout: number | undefined) {
  let returnValue: undefined | number = undefined;
  if (typeof timeout === 'number') {
    if (timeout < 0) {
      timeout = undefined;
    } else if (timeout > Number.MAX_SAFE_INTEGER) {
      returnValue = Number.MAX_SAFE_INTEGER;
    } else {
      returnValue = timeout;
    }
  }
  return returnValue;
}
