---
sidebar_position: 2
id: HttpOptions
title: HttpOptions
---

import { HttpOptions } from '@site/src/components/API';

<HttpOptions/>

- second argument of the **http-pro** request is an object which can have following properties.

1. All properties of second parameter of [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Request#properties).
2. ### `baseUrl`

   - **Type** : `string | URL`
   - `baseUrl` will be prepended to `url` unless `url` is absolute.

     :::tip
     It can be convenient to set `baseUrl` for an instance of **http-pro** and then pass relative URLs to methods of that instance.
     :::
     :::note
     If you pass [Request](https://developer.mozilla.org/en-US/docs/Web/API/Request) or [URL](https://developer.mozilla.org/en-US/docs/Web/API/URL) object in url, baseUrl property will be ignored.
     :::

- You can find detailed example [Here](../example/baseUrl.mdx).
  <br/><br/>

3.  ### `searchParams`
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
   - `validateStatus` determines whether to throw HttpProError for given status code.
   - You can find detailed examples [Here](../example/error-handling#custom-error-handling).
     <br/><br/>

6. ### `data`

   - **Type** : any value accepted by `JSON.stringify()`.
   - if you are working with json data instead of using `{body:JSON.stringify({name:"value"})}` just use `{data:{name:"value"}}` which will set json object in `body` with appropriate headers.
     <br/><br/>

7. ### `interceptors`

   - `interceptors` allows you to run custom logic before sending the request, before throwing error or after you get the response. interceptors functions can be sync or async.
     <br/><br/>

   1. #### `interceptors.beforeRequest`

      - **Type** : `beforeRequest?: (request: Request) => Request | Promise<Request>`
      - `beforeRequest` will run just before sending the request. it will receive [Request](https://developer.mozilla.org/en-US/docs/Web/API/Request) object as an argument and it should return [Request](https://developer.mozilla.org/en-US/docs/Web/API/Request) object.
        <br/><br/>

   2. #### `interceptors.beforeError`

      - **Type** : `beforeError : (response: Response, request: Request) => void | Promise<void>`
      - The `beforeError` function is called if the [validateStatus](./HttpOptions#validatestatus) function returns false, or if the [validateStatus](./HttpOptions#validatestatus) function does not exist and the status code is not in the range of 200-299. The beforeError function receives the [Response](https://developer.mozilla.org/en-US/docs/Web/API/Response) and [Request](https://developer.mozilla.org/en-US/docs/Web/API/Request) objects as arguments.
        <br/><br/>

   3. #### `interceptors.afterResponse`

      - **Type** : `afterResponse : ( response: Response, request: Request) => Response | Promise<Response>`.

      - `afterResponse` will run just after [Response](https://developer.mozilla.org/en-US/docs/Web/API/Response) is resolved. function will receive [Response](https://developer.mozilla.org/en-US/docs/Web/API/Response) and [Request](https://developer.mozilla.org/en-US/docs/Web/API/Request) object as an arguements.
        :::note
        Here, `afterResponse` won't be called if the [validateStatus](./HttpOptions#validatestatus) function returns false, or if the [validateStatus](./HttpOptions#validatestatus) function does not exist and the status code is not in the range of 200-299.
        :::

- You can detailed examples [Here](../example/interceptors).
  <br/><br/>

8.  ### `responseType`

    - **Type** : `'arrayBuffer' | 'blob' | 'json' | 'text' | 'formData' | undefined`
    - **default** : `json`.
    - `responseType` indicates that what will you from server Response and based on that it will decide what to put in `data` property of [HpResponse](HpResponse).<br/><br/>

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

9.  ### `validationSchema`

    - schema you want to validate your response data against.
    - **Type** : `Record<string, any>`
      <br/><br/>

10. ### `validationOptions`

    - options for validation function if you are using one of the [@http-pro/validator](https://www.npmjs.com/package/@http-pro/validator) function for validation.
      <br/><br/>

    1. #### `mode`

       - **Type** : `'sync' | 'async'`
       - **default** : `'async'`
       - A string indicating the mode of the validation function.

    2. #### `raw`
       - **Type** : `boolean`
       - **default** : `true`
       - boolean indicating whether the validation function should return the raw data instead of the parsed data.
         <br/><br/>

11. ### `validationFunction`

    - **Type**

    ```ts
    <ResponseType extends any = any>(
      data: ResponseType,
      options?: HPValidationOptions,
      schema?: Record<string, any>
    ) => Promise<ResponseType>;
    ```

    - function you want to validate your response data against. it will recive `data`, `options` and `schema` as arguments.
      <br/><br/>
