import { HttpError } from './HttpError';
import { TimeoutError } from './TimeoutError';

export function isHttpError(error: unknown): error is HttpError {
  return error instanceof HttpError;
}

export function isHttpProError(
  error: unknown
): error is HttpError | TimeoutError {
  return error instanceof HttpError || error instanceof TimeoutError;
}

export function isHttpProTimeoutError(error: unknown): error is TimeoutError {
  return error instanceof TimeoutError;
}
