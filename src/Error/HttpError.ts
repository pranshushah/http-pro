export class HttpError extends Error {
  public response: Response;
  public request: Request;
  constructor(response: Response, request: Request) {
    const reason =
      typeof response.status === 'number'
        ? `status code ${response.status}`
        : 'an unknown error';

    super(`Request failed with ${reason}`);
    Object.setPrototypeOf(this, new.target.prototype);

    this.name = 'HttpError';
    this.request = request;
    this.response = response;
  }
}
