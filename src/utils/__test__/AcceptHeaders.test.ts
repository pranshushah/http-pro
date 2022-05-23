import { InternalHttpOptions } from '../..';
import { addAcceptHeader } from '../AcceptHeaders';

it('should add accept headers', () => {
  const httpOptions: InternalHttpOptions = { headers: new Headers() };
  addAcceptHeader(httpOptions);
  expect(httpOptions.headers.has('accept')).toBe(true);
});

it('should not add accept headers', () => {
  const httpOptions: InternalHttpOptions = {
    headers: new Headers({ accept: 'text/plain' }),
  };
  addAcceptHeader(httpOptions);
  expect(httpOptions.headers.has('accept')).toBe(true);
  expect(httpOptions.headers.get('accept')).toBe('text/plain');
});
