import { HttpProError } from './HttpProError';
import { TimeoutError } from './TimeoutError';

export function isHttpProError(error: unknown): error is HttpProError {
  return error instanceof HttpProError;
}

export function isHttpProTimeoutError(error: unknown): error is TimeoutError {
  return error instanceof TimeoutError;
}
