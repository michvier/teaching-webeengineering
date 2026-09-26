# Lecture 5 — Eventing

Promises Code Examples: [`EXAMPLES.md`](EXAMPLES.md)

## Promise examples

The examples are in [`promises/`](promises). Read all of them with code and output in [`EXAMPLES.md`](promises/EXAMPLES.md), or open [`promises/index.html`](promises/index.html) in the browser: each example has its own page with the code, a **Run** button and the output.

| # | Example | What it shows | Read | Run in the browser |
|---|---------|---------------|------|--------------------|
| 1 | Creating a promise | `new Promise`, `resolve` / `reject`, `then` / `catch` | [code & output](promises/EXAMPLES.md#1-creating-a-promise) | [`01-creating-promises.html`](promises/01-creating-promises.html) |
| 2 | Chaining | Passing values along a `then` chain, errors skip ahead to `catch` | [code & output](promises/EXAMPLES.md#2-chaining) | [`02-chaining.html`](promises/02-chaining.html) |
| 3 | Microtasks vs. macrotasks | Microtasks (promises) always run before macrotasks (`setTimeout`) | [code & output](promises/EXAMPLES.md#3-microtasks-vs-macrotasks) | [`03-microtasks-vs-macrotasks.html`](promises/03-microtasks-vs-macrotasks.html) |
| 4 | `Promise.race` and `Promise.all` | The first promise to finish vs. waiting for all of them | [code & output](promises/EXAMPLES.md#4-promiserace-and-promiseall) | [`04-combinators.html`](promises/04-combinators.html) |
| 5 | `async` / `await` | `await` as a shorter way to write `.then()` | [code & output](promises/EXAMPLES.md#5-async--await) | [`05-async-await.html`](promises/05-async-await.html) |
| 6 | `fetch()` | Why a 404 does not reject (needs internet) | [code & output](promises/EXAMPLES.md#6-fetch) | [`06-fetch.html`](promises/06-fetch.html) |
| 7 | When if / else becomes tricky | Sync in one branch, async in the other: why the output order changes, and how `queueMicrotask` fixes it ([MDN Microtask guide](https://developer.mozilla.org/en-US/docs/Web/API/HTML_DOM_API/Microtask_guide)) | [code & output](promises/EXAMPLES.md#7-when-if--else-becomes-tricky) | [`07-tricky-if-else.html`](promises/07-tricky-if-else.html) |

The example code sits in the `<script class="example">` block at the bottom of each page. Change it, reload the page and run it again.

Tip: try to predict the output before you click **Run**.
