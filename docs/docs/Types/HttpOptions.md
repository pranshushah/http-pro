- second argument of the **http-pro** request is the object that can have following properties.

1. All properties of second parameter of [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Request#properties).
2. ### `baseUrl`

   - **Type** : `string | URL`
   - `baseUrl` will be prepended to `url` unless `url` is absolute.

     :::tip
     It can be convenient to set `baseUrl` for an instance of **http-pro** and then pass relative URLs to methods of that instance.
     :::
     :::note
     If you pass [Request]('https://developer.mozilla.org/en-US/docs/Web/API/Request') or [URL]('https://developer.mozilla.org/en-US/docs/Web/API/URL') object in url, baseUrl property will be ignored.
     :::

- You can find detailed example [Here]('').
  <br/><br/>

1. ### `searchParams`
   - **Type** : `string | object<string, string | number | boolean> | Array<Array<string | number | boolean>> | URLSearchParams | undefined`
   - it will append all the searchParams to url we passed.
   - it will accept all the values supported by [URLSearchParams](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams).

```ts
const res = await hp.get('https://www.x.com', {
  searchParams: { name: 'pranshu', age: 25 },
}); // url : https://www.x.com/?name=pranshu&age=25
```

```ts
const res = await hp.get('https://www.x.com?lastname=shah', {
  searchParams: { name: 'pranshu', age: 25 },
}); // url : https://www.x.com/?lastname=shah&name=pranshu&age=25
```

4. ### `timeout`

   - **Type** : `number|undefined`
   - `timeout` indicates the number of milliseconds before the request times out. default is no timeout.
     <br/><br/>

5. ### `validateStatus`

   - **Type** : `(status: number) => boolean`
   - `validateStatus` determines whether to throw [HttpError]('') for given status code.
   - You can find detailed examples [Here]('').
     <br/><br/>

6. ### `json`

   - **Type** : any value accepted by `JSON.stringify()`.
   - if you are working with json data instead of using `{body:JSON.stringify({name:"value"})}` just use `{json:{name:"value"}}` which will set json object in `body` with proper headers.
     <br/><br/>

7. ### `interceptors`

   - `interceptors` allows you to run custom logic before sending the request, before throwing error or after you get the response. all functions can run synchronously or it can be async.
     <br/><br/>

   1. #### `interceptors.beforeRequest`

      - **Type** : `beforeRequest?: (request: Request) => Request | Promise<Request>`
      - `beforeRequest` will run just before sending the request and it will receive [Request](https://developer.mozilla.org/en-US/docs/Web/API/Request) object and it should return `Request` object.
        <br/><br/>

   2. #### `interceptors.beforeError`

      - **Type** : `beforeError : (response: Response, request: Request) => void | Promise<void>`
      - `beforeError` will run just before throwing `httpError`. function will receive `Response` and `Request` object as an arguements.
        <br/><br/>

   3. #### `interceptors.afterResponse`

      - **Type** : `afterResponse : ( response: Response, request: Request) => Response | Promise<Response>`.

      - `beforeError` will run just after we get `Response`. function will receive `Response` and `Request` object as an arguements.

      :::note
      Here response won't be [HpResponse](''). conversion to `HpResponse` will happen after this step.
      :::

- You can detailed examples [Here]('').
  <br/><br/>

1.  ### `responseType`

    - **Type** : `'arrayBuffer' | 'blob' | 'json' | 'text' | 'formData' | undefined`
    - **default** : `json`.
    - `responseType` indicates that what will you from server Response and based on that it will decide what to put in `data` property of [HpResponse]('').<br/><br/>

    :::note
    If Error occurs while parsing the response-data, `data` will have empty object.
    :::

- **example**

  ```ts
  const res = await hp.get('someUrl.com', { responseType: 'blob' });
  console.log(res.data); // will be blob.
  ```

  ```ts
  const res = await hp.get('someUrl.com', { responseType: 'arrayBuffer' });
  console.log(res.data); // will be arrayBuffer.
  ```

  ```ts
  const res = await hp.get('someUrl.com');
  console.log(res.data); // will be parsed json
  ```

- If you define typescript type of `HttpOption` it will look something like this.

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
