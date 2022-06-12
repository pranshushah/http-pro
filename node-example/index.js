import hp from 'http-pro';

(async function() {
  const res = await hp.get('https://jsonplaceholder.typicode.com/todos/1');
  console.log(res.data);
})();
