# JavaScript Asynchronous Programming Notes

This code demonstrates the evolution of JavaScript asynchronous programming:

```text
1. Blocking (Synchronous)
        ↓
2. setTimeout (Asynchronous)
        ↓
3. Callbacks
        ↓
4. Promises
        ↓
5. Async/Await
```

---

# 1. Blocking vs Non-Blocking Code

## Blocking (Synchronous)

```js
const processOrder = () => {
    console.log("processing order");

    var currentTime = new Date().getTime();

    while (currentTime + 3000 >= new Date().getTime());

    console.log("order processed");
};

console.log("take order");
processOrder();
console.log("completed order");
```

### Output

```text
take order
processing order
(order waits 3 seconds)
order processed
completed order
```

### What Happens?

```text
Call Stack
│
├── Global
├── processOrder()
│
└── while loop
```

The `while` loop blocks the Call Stack.

Nothing else can execute until the loop finishes.

---

## Problem

```text
❌ Blocks the entire application
❌ Poor performance
❌ Freezes UI in browser
❌ Prevents handling other tasks
```

---

# 2. Asynchronous Code using setTimeout

```js
const processOrder = () => {
    console.log("processing order");

    setTimeout(() => {
        console.log("cooking complete");
    }, 3000);

    console.log("order processed");
};
```

---

### Output

```text
take order
processing order
order processed
completed order
(3 seconds later)
cooking complete
```

---

### Why?

`setTimeout()` does NOT block JavaScript.

```text
Call Stack
      │
      ▼
Web API (Timer)
      │
      ▼
Callback Queue
      │
      ▼
Event Loop
      │
      ▼
Call Stack
```

---

### Execution Flow

```text
processOrder()
      │
      ├── setTimeout registered
      │
      └── processOrder finishes

3 seconds later

Callback Queue
      │
      ▼
console.log("cooking complete")
```

---

## Problem

Order completion happens before cooking finishes.

```text
❌ Wrong business logic

Take Order
Process Order
Complete Order
Cooking Complete
```

The order should complete AFTER cooking.

---

# 3. Solving with Callbacks

## Callback Definition

```text
Callback =
Function passed into another function
to execute later.
```

---

### Example

```js
takeOrder(customer, callback);
```

Here:

```text
callback =
(customer) => {
    processOrder(...)
}
```

---

## Flow

```js
takeOrder()
    ↓
processOrder()
    ↓
setTimeout()
    ↓
callback()
    ↓
completeOrder()
```

---

### Output

```text
take order for Custo-Naimur

processing order for Custo-Naimur

(wait 3 seconds)

cooking complete

order processed for Custo-Naimur

completed order for Custo-Naimur
```

---

## Why Callbacks Work

Inside:

```js
setTimeout(() => {

    console.log("cooking complete");

    callback(customer);

}, 3000);
```

JavaScript waits until cooking finishes.

Then:

```js
callback(customer);
```

runs the next step.

---

## Callback Hell Problem

Imagine:

```js
takeOrder(() => {

    processOrder(() => {

        makePayment(() => {

            deliverOrder(() => {

                notifyCustomer();

            });

        });

    });

});
```

---

### Visualization

```text
takeOrder
    └── processOrder
            └── makePayment
                    └── deliverOrder
                            └── notifyCustomer
```

Known as:

```text
Callback Hell
Pyramid of Doom
```

---

# 4. Promises

Promises solve Callback Hell.

---

## Promise States

```text
Pending
   │
   ├── Fulfilled (resolve)
   │
   └── Rejected (reject)
```

---

### Your Example

```js
const hasMeeting = false;
```

---

```js
const meeting = new Promise((resolve, reject) => {

    if (!hasMeeting) {

        resolve(meetingDetails);

    } else {

        reject(
            new Error(
                "Meeting already scheduled"
            )
        );

    }

});
```

---

### Resolve Path

```text
Pending
   │
   ▼
resolve()
   │
   ▼
Fulfilled
```

---

### Reject Path

```text
Pending
   │
   ▼
reject()
   │
   ▼
Rejected
```

---

# Consuming a Promise

```js
meeting
    .then((res) => {
        console.log(res);
    })
    .catch((err) => {
        console.log(err);
    });
```

---

### then()

Runs when:

```js
resolve(...)
```

executes.

---

### catch()

Runs when:

```js
reject(...)
```

executes.

---

# Promise.resolve()

```js
const promise1 =
    Promise.resolve("Promise 1 resolved");
```

Creates an already resolved Promise.

---

Output:

```text
Promise 1 resolved
```

---

# Promise.all()

```js
Promise.all([
    promise1,
    promise2
]);
```

---

### Rule

Wait for ALL promises.

```text
Promise1 ✅
Promise2 ✅
Promise3 ✅

Result:
Returned
```

---

### Output

```js
[
  "Promise 1 resolved",
  "Promise 2 resolved"
]
```

---

# Promise.race()

```js
Promise.race([
    promise1,
    promise2
]);
```

---

### Rule

Return first completed Promise.

```text
Promise1 finishes first
        ↓
Return immediately
```

---

Output:

```text
Promise 1 resolved
```

---

# 5. Async/Await

## Async Function

```js
async function friendFunction() {
    return "Hello";
}
```

Actually returns:

```js
Promise.resolve("Hello");
```

---

### Output

```js
Promise { "Hello" }
```

Not:

```text
Hello
```

---

# await

```js
async function myMeeting() {

    const meetingDetails =
        await meeting;

}
```

---

### What await Does

Without await:

```js
const details = meeting;
```

Result:

```js
Promise { ... }
```

---

With await:

```js
const details = await meeting;
```

Result:

```js
{
   name: "Technical Meeting",
   location: "Zoom online",
   time: "10:00 pm"
}
```

---

## Internal Flow

```text
await meeting

      │
      ▼

Pause Function

      │
      ▼

Wait for Promise

      │
      ▼

Resolve

      │
      ▼

Continue Execution
```

---

# Fixing Your Code

Currently:

```js
async function myMeeting() {
    const meetingsDetails = await meeting;
}

myMeeting();
```

Nothing is displayed.

---

Use:

```js
async function myMeeting() {

    const meetingDetails =
        await meeting;

    console.log(meetingDetails);

}

myMeeting();
```

---

Output

```js
{
  name: "Technical Meeting",
  location: "Zoom online",
  time: "10:00 pm"
}
```

---

# Interview Questions

### What is a Callback?

A function passed to another function to be executed later.

---

### What problem do Promises solve?

Callback Hell.

---

### Promise States?

```text
Pending
Fulfilled
Rejected
```

---

### What does async do?

Wraps the return value in a Promise.

---

### What does await do?

Waits for a Promise to resolve and returns its resolved value.

---

# Key Takeaways

```text
Synchronous
=
One task at a time
=
Blocking

setTimeout
=
Non-blocking

Callback
=
Run function later

Promise
=
Represents future value

then()
=
Success handler

catch()
=
Error handler

async
=
Returns Promise

await
=
Waits for Promise result
```

### Learning Sequence

```text
Callbacks
      ↓
Promises
      ↓
Promise.all()
      ↓
Promise.race()
      ↓
Async/Await
      ↓
Fetch API
      ↓
Real-world APIs
```

This is the exact foundation used in React, Node.js, Express, Next.js, databases, and API calls.
