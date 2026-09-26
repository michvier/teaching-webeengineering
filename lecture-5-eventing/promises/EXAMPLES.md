# Lecture 5 — Promise Examples


In the browser: each example has its own page with a **Run** button.

1. [Creating a promise](#1-creating-a-promise)
2. [Chaining](#2-chaining)
3. [Microtasks vs. macrotasks](#3-microtasks-vs-macrotasks)
4. [Promise.race and Promise.all](#4-promiserace-and-promiseall)
5. [async / await](#5-async--await)
6. [fetch()](#6-fetch)
7. [When if / else becomes tricky](#7-when-if--else-becomes-tricky)

## 1. Creating a promise

A promise is a value that arrives *later*. Here a coin flip either resolves (`then`) or rejects (`catch`). Run it a few times.

```js
function example1() {
  const coinFlip = new Promise((resolve, reject) => {
    if (Math.random() < 0.5) resolve("Heads");
    else reject("Tails");
  });

  coinFlip
    .then((result) => console.log("Won:", result))
    .catch((error) => console.log("Lost:", error));

  console.log("Flipping..."); // still runs first: then/catch always run later
}
```

Output (random: you get either `Won: Heads` or `Lost: Tails`):

```
Flipping...
Won: Heads
```

[Run it in the browser](01-creating-promises.html)

## 2. Chaining

Each `.then()` passes its return value to the next one. When an error is thrown, the chain skips ahead to `.catch()`.

```js
function example2() {
  Promise.resolve(1)
    .then((n) => n + 1)   // 2
    .then((n) => n * 10)  // 20
    .then((n) => {
      console.log("Result:", n);
      throw new Error("Oops");
    })
    .then(() => console.log("This is skipped"))
    .catch((error) => console.log("Caught:", error.message));
}
```

Output:

```
Result: 20
Caught: Oops
```

[Run it in the browser](02-chaining.html)

## 3. Microtasks vs. macrotasks

Promise callbacks are **microtasks**, `setTimeout` callbacks are **macrotasks**. When the normal code is done, the browser runs *all* microtasks first, even new ones added along the way. Only then does it run the next macrotask, even with a delay of 0 ms.

```js
function example3() {
  setTimeout(() => console.log("macrotask: setTimeout"), 0);

  Promise.resolve().then(() => {
    console.log("microtask: promise");
    queueMicrotask(() => console.log("microtask: queued by a microtask"));
  });

  console.log("sync: normal code");
}
```

Output:

```
sync: normal code
microtask: promise
microtask: queued by a microtask
macrotask: setTimeout
```

[Run it in the browser](03-microtasks-vs-macrotasks.html)

## 4. Promise.race and Promise.all

`race` gives you the first promise that finishes. `all` waits for every promise.

```js
function wait(ms, value) {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

function example4() {
  const slow = wait(1000, "slow");
  const fast = wait(500, "fast");

  Promise.race([slow, fast]).then((winner) => console.log("race:", winner));
  Promise.all([slow, fast]).then((values) => console.log("all:", values));
}
```

Output:

```
race: fast
all: [ 'slow', 'fast' ]
```

[Run it in the browser](04-combinators.html)

## 5. async / await

`await` is a shorter way to write `.then()`: it waits for the promise and gives you its value. You can only use it inside an `async` function.

```js
async function example5() {
  const promise = Promise.resolve(42);

  // with then
  promise.then((n) => console.log("then: ", n));

  // with await: same result, reads like normal code
  const n = await promise;
  console.log("await:", n);
}
```

Output:

```
then:  42
await: 42
```

[Run it in the browser](05-async-await.html)

## 6. fetch()

`fetch()` returns a promise. Careful: a 404 does *not* throw an error! Needs an internet connection.

```js
async function example6() {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos/1");
  const todo = await response.json();
  console.log("Title:", todo.title);

  const missing = await fetch("https://jsonplaceholder.typicode.com/todos/99999");
  console.log("Status:", missing.status, "ok:", missing.ok); // 404, but no error!
}
```

Output:

```
Title: delectus aut autem
Status: 404 ok: false
```

[Run it in the browser](06-fetch.html)

## 7. When if / else becomes tricky

If the data is cached, the callback runs *now*. Otherwise it runs *later*. So the same code logs in a different order! Try the fix in the comment. Based on the [MDN Microtask guide](https://developer.mozilla.org/en-US/docs/Web/API/HTML_DOM_API/Microtask_guide).

```js
let cached = null;

function getData(callback) {
  if (cached) {
    callback(cached);  // runs NOW
    // Fix: queueMicrotask(() => callback(cached));
  } else {
    Promise.resolve("data").then((data) => {
      cached = data;
      callback(data);  // runs LATER
    });
  }
}

function example7() {
  cached = null;

  console.log("before");
  getData(() => console.log("got data"));
  console.log("after");

  setTimeout(() => {
    console.log("--- again, now cached ---");
    console.log("before");
    getData(() => console.log("got data"));
    console.log("after");
  }, 100);
}
```

Output:

```
before
after
got data
--- again, now cached ---
before
got data
after
```

[Run it in the browser](07-tricky-if-else.html)
