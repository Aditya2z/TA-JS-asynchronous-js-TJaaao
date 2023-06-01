- Create four promises that resolve after 1, 2, 3 and 4 seconds with a random value. Using `Promise.all` log the value of each promise that it resolved with.
```js
function createPromiseWithRandomValue(randomValue,delay) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(randomValue);
    }, delay);
  });
}

const promises = [
  createPromiseWithRandomValue(100, 1000), 
  createPromiseWithRandomValue(200, 2000),
  createPromiseWithRandomValue(300, 3000),
  createPromiseWithRandomValue(400, 4000), 
];

Promise.all(promises)
  .then((values) => {
    values.forEach((value, index) => {
      console.log(`Promise ${index + 1} resolved with value: ${value}`);
    });
  })
  .catch((error) => {
    console.error("An error occurred:", error);
  });
  ```

- Create a list of 5 Github usernames in an array and using `Promise.all` get access to the data of each user from GitHub API. Log the number of followers of each user.

- Use `Promise.race` to see which API resolves faster from the given list of URLs. Log the object you get from the promise that is resolved faster.

  - https://random.dog/woof.json
  - https://aws.random.cat/meow

  ```js
let apis = [  `https://random.dog/woof.json`, `https://aws.random.cat/meow`];

Promise.race(apis).then(response => {
  console.log(response);
  return response;
  });

  //first api resolves faster
  ```

- Use `Promise.allSettled` to log the value of each promise from the given list of promises. And also check if `Promise.all` works with `one`, `two` and `three` or not

```js
const one = new Promise((resolve, reject) =>
  setTimeout(() => resolve('Arya'), 1000)
);
const two = new Promise((resolve, reject) =>
  setTimeout(() => reject(new Error('Whoops!')), 2000)
);
const three = new Promise((resolve, reject) =>
  setTimeout(() => resolve('John'), 3000)
);

Promise.allSettled([one, two, three]).then((response) => {
  console.log(response);
  return response;
})
```
`Promise.all` does not works with `one`, `two` and `three` because `two` is rejected.

- What will be the output of the following code snippet? How much time will it take for the promise to resolve?

```js
Promise.all([
  new Promise((resolve, reject) => {
    setTimeout(() => resolve('Arya'), 1000);
  }),
  'Sam',
  { name: 'John' },
]).then(console.log);
```
Output: ["Arya", "Sam", { name: 'John' }]
Since Promise.all() waits for all promises to resolve or reject before returning a new promise, the overall time it takes for the Promise.all() call to resolve will be determined by the slowest promise, which in this case is the one with a 1-second delay.