- second Argument of the **http-pro** request is the object that has a typescript type `HttpOptions`.

```ts
type SearchParamsInit =
  | string
  | URLSearchParams
  | undefined
  | [string | boolean | number, string | number | boolean][]
  | Record<string, string | boolean | number>;

type Interceptors = {
  beforeRequest?: (request: Request) => Request | Promise<Request>;
  beforeError?: (response: Response, request: Request) => void | Promise<void>;
  afterResponse?: (
    response: Response,
    request: Request
  ) => Response | Promise<Response>;
};

interface HttpOptions extends RequestInit {
  baseUrl?: string | URL;
  searchParams?: SearchParamsInit;
  timeout?: number;
  validateStatus?: (status: number) => boolean;
  json?: unknown;
  interceptors?: Interceptors;
  responseType?:
    | 'arrayBuffer'
    | 'blob'
    | 'json'
    | 'text'
    | 'formData'
    | undefined;
}
```
