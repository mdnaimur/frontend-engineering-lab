
// const appName = "Myapp";

// function init() {
//     const secret = "hidden";

//     if (true) {
//         let blockVar = " i am block-scoped";
//         var functionVar = " i leak out  of blocks"
//     }

//     console.log(functionVar);
//     console.log(blockVar);
// }

// init();


// const level1 = "global";

// function outer() {
//     const level12 = "outer";

//     function middle() {
//         const level13 = "middle";

//         function inner() {
//             const level14 = "inner";

//             console.log(level14); // found in inner scope
//             console.log(level13); // not in inner -> found in middle
//             console.log(level12); // not in inner/middle -> found in outer
//             console.log(level1);  // found in global scope
//         }

//         inner();
//     }

//     middle();
// }

// outer();


// hoisting 
// console.log(name);
// var name = "md naimur"


// console.log(a); // undefined  — var is hoisted and initialized
// console.log(b); // ReferenceError — let is in TDZ
// console.log(c); // ReferenceError — const is in TDZ

// var a = 1;
// let b = 2;
// const c = 3;

// This works — function declaration is fully hoisted
// greet("Ayesha"); // "Hello, Ayesha!"

// function greet(name) {
//     console.log(`Hello, ${name}!`);
// }

// This fails — function expression is NOT hoisted
// sayBye("Bilal"); // TypeError: sayBye is not a function

// const sayBye = function (name) {
//     console.log(`Bye, ${name}!`);
// };

// function makeCounter() {
//     let count = 0;  // this variable lives in makeCounter's scope

//     return function () {
//         count++;        // inner function remembers count
//         return count;
//     };
// }

// const counter = makeCounter();
// // makeCounter() has finished running — its scope is "gone"
// // but count is NOT garbage collected because the inner function holds a reference

// console.log(counter()); // 1
// console.log(counter()); // 2
// console.log(counter()); // 3

// // Each call to makeCounter() creates a NEW independent closure
// const counterA = makeCounter();
// const counterB = makeCounter();
// counterA(); // 1
// counterA(); // 2
// counterB(); // 1  — completely separate count


// 1. Private state — data that can't be touched from outside

function createBankAccount(initialBalance) {
    let balance = initialBalance; // private — no direct access

    return {
        deposit(amount) {
            if (amount <= 0) throw new Error("Invalid amount");
            balance += amount;
            return balance;
        },
        withdraw(amount) {
            if (amount > balance) throw new Error("Insufficient funds");
            balance -= amount;
            return balance;
        },
        getBalance() {
            return balance;
        }
    };
}

const account = createBankAccount(1000);
account.deposit(500);        // 1500
account.withdraw(200);       // 1300
console.log(account.balance);    // undefined — truly private!
console.log(account.getBalance()); // 1300 — only through the API


// 2. Function factories — generate specialized functions
function createMultiplier(factor) {
    return (number) => number * factor; // closes over factor
}

const double = createMultiplier(2);
const triple = createMultiplier(3);
const times10 = createMultiplier(10);

console.log(double(5));   // 10
console.log(triple(5));   // 15
console.log(times10(5));  // 50


// 3. Memoization — cache expensive results (used in React.useMemo)
function memoize(fn) {
    const cache = {}; // closes over this cache

    return function (...args) {
        const key = JSON.stringify(args);

        if (key in cache) {
            console.log("Cache hit");
            return cache[key];
        }

        console.log("Computing...");
        cache[key] = fn(...args);
        return cache[key];
    };
}

function slowSquare(n) {
    // imagine this takes a long time
    return n * n;
}

const fastSquare = memoize(slowSquare);
fastSquare(10);  // "Computing..."  → 100
fastSquare(10);  // "Cache hit"     → 100
fastSquare(20);  // "Computing..."  → 400
fastSquare(20);  // "Cache hit"     → 400


// A simplified React useState — it's just a closure
function useState(initialValue) {
    let state = initialValue;       // closed-over state

    function getState() {
        return state;
    }

    function setState(newValue) {
        state = newValue;
        render();                     // trigger re-render
    }

    return [getState, setState];
}

console.log("\n\n\n ==============================================\n\n")


// 1. Global context — this is the window object (browser)
console.log(this); // Window {}

// 2. Object method — this is the object
const user = {
    name: "Sara",
    greet() {
        console.log(`Hi, I'm ${this.name}`); // this → user
    }
};
user.greet(); // "Hi, I'm Sara"

// 3. Regular function — this is undefined (strict mode) or window
function showThis() {
    console.log(this); // undefined in strict mode
}

// 4. Arrow function — this is inherited from surrounding scope
const team = {
    name: "Dev Team",
    members: ["Alice", "Bob", "Charlie"],

    // Regular function — this works
    listMembers() {
        // 'this' here is 'team' ✓
        this.members.forEach(function (member) {
            // BUG: 'this' here is undefined — regular function has its own 'this'
            console.log(`${this.name}: ${member}`);
        });
    },

    // Arrow function fix
    listMembersFixed() {
        // 'this' here is 'team' ✓
        this.members.forEach((member) => {
            // Arrow inherits 'this' from listMembersFixed ✓
            console.log(`${this.name}: ${member}`);
        });
    }
};

team.listMembers();      // TypeError — this.name is undefined
team.listMembersFixed(); // "Dev Team: Alice", etc.


// 5. Explicit binding — call, apply, bind
function introduce(greeting, punctuation) {
    console.log(`${greeting}, I'm ${this.name}${punctuation}`);
}

const person = { name: "Rahul" };

introduce.call(person, "Hello", "!");    // call — args one by one
introduce.apply(person, ["Hello", "!"]); // apply — args as array
const boundFn = introduce.bind(person);  // bind — returns a new function
boundFn("Hey", ".");                     // call it later


// The prototype chain in action
const arr = [1, 2, 3];
arr.map(x => x * 2); // where does .map come from?
// arr → Array.prototype → Object.prototype → null
// .map lives on Array.prototype — every array inherits it


// Constructor functions (the old way — still important to understand)
function Person(name, age) {
    this.name = name;
    this.age = age;
}

// Methods go on the prototype — shared by ALL instances (not copied)
Person.prototype.greet = function () {
    return `Hi, I'm ${this.name}`;
};

Person.prototype.isAdult = function () {
    return this.age >= 18;
};

const alice = new Person("Alice", 25);
const bob = new Person("Bob", 17);

console.log(alice.greet());    // "Hi, I'm Alice"
console.log(bob.isAdult());    // false

// alice and bob share ONE copy of greet/isAdult — not duplicated
console.log(alice.greet === bob.greet); // true — same function reference


const person1 = {
    name: "Naimur"
};

function greet() {
    console.log(`hello ${this.name}`)
}

greet.call(person1);
console.log(person1.name)

function inctroduce(city, country) {
    console.log(
        `${this.name} lives in ${city}, ${country}`
    )
}

inctroduce.call(
    person1,
    "Dhaka",
    "bangladesh"
)

inctroduce.apply(
    person1,
    ["Dhaka",
        "bangladesh"]
)
const greetnaimur = greet.bind(person1);
console.log(greetnaimur);

greetnaimur();
console.log("================== Prototypes and Inheritance =====================")

const arr1 = [1, 2, 3];
arr1.map(x => x * 2);

console.log(arr1);

function person22(name, age) {
    this.name = name;
    this.age = age;
};

person22.prototype.greet = function () {
    return `Hi, I am ${this.name}`
}

person22.prototype.isAdult = function () {
    return this.age >= 18;
};

const alice1 = new person22("Alice", 25);
const bob1 = new person22("Bob", 17);

console.log(alice1.greet());    // "Hi, I'm Alice"
console.log(bob1.isAdult());    // false

// alice and bob share ONE copy of greet/isAdult — not duplicated
console.log(alice1.greet === bob1.greet);


console.log("================== ES6 and Inheritance =====================")

class Animal {
    constructor(name, sound) {
        this.name = name;
        this.sound = sound;
    }

    speak() {
        return `${this.name} says &{this.sound}`;
    }

    toString() {
        return `Animal(${this.name})`;
    }
}


class Dog extends Animal {
    constructor(name) {
        super(name, 'Woof');
        this.tricks = [];
    }

    learn(trick) {
        this.tricks.push(trick);
        return this;
    }


    perform() {
        if (this.tricks.length === 0) return `${this.name} knows no tricks.`;
        return `${this.name} performs:${this.tricks.join(', ')}`;
    }

    speak() {
        return `${super.speak()} *wags tail*`; // call parent method
    }
}


const rex = new Dog("Rex");
rex.learn("sit").learn("shake").learn("roll over"); // chaining
console.log(rex.perform()); // "Rex performs: sit, shake, roll over"
console.log(rex.speak());   // "Rex says Woof! *wags tail*"
console.log(rex instanceof Dog);    // true
console.log(rex instanceof Animal);



// 1. Optional chaining — safely access nested properties
const user66 = { profile: { address: { city: "Dhaka" } } };
const incompleteUser = { name: "Sara" };

// Old way — crashes if profile is undefined
const city22 = user.profile && user.profile.address && user.profile.address.city;

// Modern way — returns undefined instead of crashing
const city222 = user?.profile?.address?.city;          // "Dhaka"
const city2 = incompleteUser?.profile?.address?.city; // undefined — no crash

// // Works with methods and arrays too
// const firstTag = post?.tags?.[0];
// const length = post?.getTags?.()?.length;


// 2. Nullish coalescing — default only for null/undefined (not 0 or "")
const score = 0;
const username = "";

// Old problem — || treats 0 and "" as falsy
const display1 = score || "No score";  // "No score" — WRONG!
const display2 = username || "Anonymous"; // "Anonymous" — WRONG!

// Fix — ?? only falls back for null or undefined
const display3 = score ?? "No score";  // 0         — correct!
const display4 = username ?? "Anonymous"; // ""        — correct!
const display5 = null ?? "Default";   // "Default" — correct!


// 3. Destructuring in function parameters — used constantly in React
function renderUser({ name, age, role = "viewer", avatar = "/default.png" }) {
    return `<div>${name} (${age}) — ${role}</div>`;
}

const user1 = { name: "Ayesha", age: 22, role: "admin" };
renderUser(user1); // clean — no user.name, user.age everywhere


// 4. Computed property names
const field = "email";
const value = "ayesha@example.com";

const update = { [field]: value };         // { email: "ayesha@example.com" }

// Used everywhere in React state updates
function handleInputChange(fieldName, value) {
    setState(prev => ({ ...prev, [fieldName]: value }));
}


// 5. Tagged template literals — used in styled-components (React CSS)
function highlight(strings, ...values) {
    return strings.reduce((result, str, i) =>
        `${result}${str}${values[i] !== undefined ? `<mark>${values[i]}</mark>` : ''}`,
        '');
}

const name = "JavaScript";
const year = 1995;
console.log(highlight`${name} was created in ${year}.`);
// "<mark>JavaScript</mark> was created in <mark>1995</mark>."


// 6. Modules — how modern JavaScript is organized
// math.js
const PI = 3.14159;
function add(a, b) { return a + b; }
function multiply(a, b) { return a * b; }

// app.js


let tex = 0.1;
function calculateTotal(price) {
    return price + (price * tex);
}


function calculateTotal(price, textRate) {
    return price + (price * textRate);
}

const state = { user: "Sara", score: 10, level: 2 };

state.score = 30;

const newState = { ...state, score: 35 };
const trim = str => str.trim();
const lowercase = str => str.toLowerCase();
const removeSpaces = str => str.replace(/\s+/g, '-');

const compose = (...fns) => (x) => fns.reduceRight((v, f) => f(v));
const pipe_set = (...fns) => (x) => fns.reduce((v, f) => f(v), x);

const slugify = pipe_set(trim, lowercase, removeSpaces);

console.log(slugify("  Hello World  "));


function createTimer() {
    let elapsed = 0;
    let startTime = null;
    let running = false;

    return {
        start() {
            if (running) return;
            startTime = Date.now();
            running = true;        // ✅ was false
        },

        stop() {
            if (!running) return;
            elapsed += Date.now() - startTime;
            startTime = null;      // ✅ clean up startTime on stop
            running = false;
        },

        reset() {
            elapsed = 0;
            startTime = null;
            running = false;
        },

        getElapsed() {
            if (running) return elapsed + (Date.now() - startTime);
            return elapsed;
        }
    };
}

// ✅ Correct test sequence
const timer = createTimer();
timer.start();

setTimeout(() => {
    timer.stop();
    console.log(timer.getElapsed()); // ~2000ms
    timer.reset();
    console.log(timer.getElapsed()); // 0
}, 2000);
class Stack {
    constructor() {
        this.items = [];
    }

    push(item) {
        this.items.push(item);
    }

    pop() {
        if (this.isEmpty()) {
            throw new Error("Cannot pop from an empty stack");
        }

        return this.items.pop();
    }

    peek() {
        if (this.isEmpty()) {
            throw new Error("Cannot peek into an empty stack");
        }

        return this.items[this.items.length - 1];
    }


    isEmpty() {
        return this.items.length === 0;
    }

    get Size() {
        return this.items.length;
    }
}

const stack = new Stack();

stack.push("HTML");
stack.push("CSS");
stack.push("JavaScript");

console.log(stack.peek());




const orders = [
    { id: 1, customer: "Alice", items: 3, total: 120, status: "completed" },
    { id: 2, customer: "Bob", items: 1, total: 45, status: "pending" },
    { id: 3, customer: "Alice", items: 2, total: 89, status: "completed" },
    { id: 4, customer: "Sara", items: 5, total: 230, status: "completed" },
    { id: 5, customer: "Bob", items: 2, total: 67, status: "cancelled" },
];

const completeOrders = orders.filter(o => o.status === "completed");
console.log(completeOrders);

// revenue and count

const { totalRevenue, orderCount } = completeOrders.reduce(
    (acc, order) => {
        acc.totalRevenue += order.total;
        acc.orderCount += 1;
        return acc;
    },

    { totalRevenue: 0, orderCount: 0 }
);


/// average

const averageOrderValue = totalRevenue / orderCount;

/// customer spednding 

const customerSpending = orders.reduce(
    (acc, order) => {
        acc[order.customer] = (acc[order.customer] || 0) + order.total;
        return acc;
    }, {}
);


/// top customer

const topCustomer = Object.entries(customerSpending).reduce(
    (max, [customer, total]) =>
        total > max.total ? { customer, total } : max,
    { customer: null, total: 0 }

).customer;

const report = {
    totalRevenue,
    orderCount,
    averageOrderValue,
    topCustomer
};

console.log(report);

