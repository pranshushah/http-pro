export class TimeoutError extends Error {
  public request: Request;
  public timeout: number;

  constructor(request: Request, timeout: number) {
    super(`Request timed out in ${timeout} miliseconds.`);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = 'TimeoutError';
    this.request = request;
    this.timeout = timeout;
  }
}
