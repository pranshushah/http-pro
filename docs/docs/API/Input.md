---
sidebar_position: 1
id: Input
title: Input
---

import { Input } from '@site/src/components/API';

<Input/>

- **Type** : `string | URL | Request`
- when you try to fetch any request with http-pro, first argument it will acceept is url. url can be one of the following type.

  1.  `string`. it can be absoulte URL or relative URL if you are working with [baseURL](./HttpOptions#baseurl).
  2.  javascript [URL](https://developer.mozilla.org/en-US/docs/Web/API/URL) object.
  3.  javascript [Request](https://developer.mozilla.org/en-US/docs/Web/API/Request) object.
      <br/><br/>

- ### Example

```ts
const res = await hp.get('https://www.x.com/api/users');
console.log(res.data); // list of users
```

```ts
const url = new URL('https://www.x.com/api/users');
const res = await hp.get(url);
console.log(res.data); // list of users
```

```ts
const request = new Request('https://www.x.com/api/users');
const res = await hp.get(request);
console.log(res.data); // list of users
```
