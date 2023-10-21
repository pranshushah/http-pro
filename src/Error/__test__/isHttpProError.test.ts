import { TimeoutError } from '../TimeoutError';
import { HttpProError } from '../HttpProError';
import { isHttpProTimeoutError, isHttpProError } from '../isHttpProError';

it('should return true for HttpError instance', () => {
  try {
    throw new HttpProError(
      new Response('Not Found', { status: 404 }),
      new Request('https://www.google.com')
    );
  } catch (e) {
    const answer = isHttpProError(e);
    expect(answer).toBe(true);
  }
});

it('should return false for HttpError instance', () => {
  try {
    throw new TimeoutError(new Request('https://www.google.com'), 100);
  } catch (e) {
    const answer = isHttpProError(e);
    expect(answer).toBe(false);
  }
});

it('should return false other types of error', () => {
  try {
    throw new Error('Something went wrong');
  } catch (e) {
    const answer = isHttpProError(e);
    expect(answer).toBe(false);
  }
});

it('should return true for TimeoutError instance', () => {
  try {
    throw new TimeoutError(new Request('https://www.google.com'), 100);
  } catch (e) {
    const answer = isHttpProTimeoutError(e);
    expect(answer).toBe(true);
  }
});

it('should return false for TimeoutError', () => {
  try {
    throw new HttpProError(
      new Response('Not Found', { status: 404 }),
      new Request('https://www.google.com')
    );
  } catch (e) {
    const answer = isHttpProTimeoutError(e);
    expect(answer).toBe(false);
  }
});
