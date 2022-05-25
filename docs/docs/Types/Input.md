- In each http-pro request **url** is the first parameter. which is the type of `Input`. it can be defined as below.

```ts
type Input = string | URL | Request;
```

## Explanation

- url can be one of the following.
  1. string.
  2. javascript [URL](https://developer.mozilla.org/en-US/docs/Web/API/URL) object.
  3. javascript [Request](https://developer.mozilla.org/en-US/docs/Web/API/Request) object itself.
