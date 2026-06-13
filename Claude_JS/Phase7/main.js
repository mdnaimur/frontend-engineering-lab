// 1. Global scope — accessible everywhere
const appName = "MyApp";

function init() {
    // 2. Function scope — only inside this function
    const secret = "hidden";

    if (true) {
        // 3. Block scope — only inside this block (let/const)
        let blockVar = "I'm block-scoped";
        var functionVar = "I leak out of blocks!"; // var ignores block scope
    }

    console.log(functionVar); // works — var leaked out
    console.log(blockVar);    // ReferenceError — let stayed in block
}

// init();


const level1 = "global";

function outer() {
    const level2 = "outer";

    function middle() {
        const level3 = "middle";

        function inner() {
            const level4 = "inner";

            // JavaScript looks UP the chain until it finds it or hits global
            console.log(level4); // found in inner — stops here
            console.log(level3); // not in inner → look in middle → found
            console.log(level2); // not in inner/middle → look in outer → found
            console.log(level1); // not anywhere local → found in global
            console.log(level5); // nowhere in chain → ReferenceError
        }

        inner();
    }

    middle();
}

// outer();


// function memoize(fn) {
//     const cache = {}; // closes over this cache

//     return function (...args) {
//         // console.log(`inside args function value: ${args}`);
//         // console.dir("check dir", args);
//         const key = JSON.stringify(args);

//         if (key in cache) {
//             console.log("Cache hit");
//             return cache[key];
//         }

//         console.log("Computing...");
//         cache[key] = fn(...args);
//         return cache[key];
//     };
// }

// function slowSquare(n) {
//     // imagine this takes a long time
//     return n * n;
// }

// const fastSquare = memoize(slowSquare);
// console.dir(fastSquare);
// fastSquare(10);  // "Computing..."  → 100
// fastSquare(10);  // "Cache hit"     → 100
// fastSquare(20);  // "Computing..."  → 400
// fastSquare(20);  // "Cache hit"     → 400



// console.log(this);

// const user = {
//     name: "Sara",
//     greet() {
//         console.log(`Hi, I'm ${this.name}`); // this → user
//     }
// };
// user.greet()


// function showThis() {
//     console.log(this); // undefined in strict mode
// }


// showThis();


// // 4. Arrow function — this is inherited from surrounding scope
// const team = {
//     name: "Dev Team",
//     members: ["Alice", "Bob", "Charlie"],

//     // Regular function — this works
//     listMembers() {
//         // 'this' here is 'team' ✓

//         this.members.forEach(function (member) {
//             // BUG: 'this' here is undefined — regular function has its own 'this'
//             console.log(`${this.name}: ${member}`);
//         });
//     },

//     // Arrow function fix
//     listMembersFixed() {
//         // 'this' here is 'team' ✓
//         this.members.forEach((member) => {
//             // Arrow inherits 'this' from listMembersFixed ✓
//             console.log(`${this.name}: ${member}`);
//         });
//     }
// };

// team.listMembers();      // TypeError — this.name is undefined
// team.listMembersFixed(); // "Dev Team: Alice", etc.


// // 5. Explicit binding — call, apply, bind
// function introduce(greeting, punctuation) {
//     console.log(this)
//     console.log(`${greeting}, I'm ${this.name}${punctuation}`);
// }

// const person = { name: "Rahul" };
// introduce.call(person, "Hello", "!");    // call — args one by one
// introduce.apply(person, ["Hello", "!"]); // apply — args as array
// const boundFn = introduce.bind(person);  // bind — returns a new function
// boundFn("Hey", "."); 

// The prototype chain in action
const arr = [1, 2, 3];
arr.map(x => x * 2); // where does .map come from?
// arr → Array.prototype → Object.prototype → null
// .map lives on Array.prototype — every array inherits it


// Constructor functions (the old way — still important to understand)
// function Person(name, age) {
//     this.name = name;
//     this.age = age;
// }

// // Methods go on the prototype — shared by ALL instances (not copied)
// Person.prototype.greet = function () {
//     return `Hi, I'm ${this.name}`;
// };

// Person.prototype.isAdult = function () {
//     return this.age >= 18;
// };

// const alice = new Person("Alice", 25);
// const bob = new Person("Bob", 17);

// console.log(alice.greet());    // "Hi, I'm Alice"
// console.log(bob.isAdult());    // false

// // alice and bob share ONE copy of greet/isAdult — not duplicated
// console.log(alice.greet === bob.greet); // true — same function reference



// class Animal {
//     constructor(name, sound) {
//         this.name = name;
//         this.sound = sound;
//     }

//     speak() {
//         return `${this.name} says ${this.sound}!`;
//     }

//     toString() {
//         return `Animal(${this.name})`;
//     }
// }

// class Dog extends Animal {
//     constructor(name) {
//         super(name, "Woof");  // call parent constructor
//         this.tricks = [];
//     }

//     learn(trick) {
//         this.tricks.push(trick);
//         return this;           // return this for method chaining
//     }

//     perform() {
//         if (this.tricks.length === 0) return `${this.name} knows no tricks.`;
//         return `${this.name} performs: ${this.tricks.join(', ')}`;
//     }

//     // Override parent method
//     speak() {
//         return `${super.speak()} *wags tail*`; // call parent method
//     }
// }

// const rex = new Dog("Rex");
// rex.learn("sit").learn("shake").learn("roll over"); // chaining
// console.log(rex.perform()); // "Rex performs: sit, shake, roll over"
// console.log(rex.speak());   // "Rex says Woof! *wags tail*"
// console.log(rex instanceof Dog);    // true
// console.log(rex instanceof Animal); // true — inheritance works





// const user = { name: "Ayesha", age: 22, role: "admin" };
// renderUser(user); // clean — no user.name, user.age everywhere


// // 4. Computed property names
// const field = "email";
// const value = "ayesha@example.com";

// const update = { [field]: value };         // { email: "ayesha@example.com" }

// // Used everywhere in React state updates
// function handleInputChange(fieldName, value) {
//     setState(prev => ({ ...prev, [fieldName]: value }));
// }


// // 5. Tagged template literals — used in styled-components (React CSS)
// function highlight(strings, ...values) {
//     return strings.reduce((result, str, i) =>
//         `${result}${str}${values[i] !== undefined ? `<mark>${values[i]}</mark>` : ''}`,
//         '');
// }

// const name = "JavaScript";
// const year = 1995;
// console.log(highlight`${name} was created in ${year}.`);
// // "<mark>JavaScript</mark> was created in <mark>1995</mark>."


// // 6. Modules — how modern JavaScript is organized
// // math.js
// const PI = 3.14159;
// function add(a, b) { return a + b; }
// function multiply(a, b) { return a * b; }

// app.js


// function Stack() { }

// Stack.prototype.sayHello = function () {
//     console.log("Hello");
// };


// class Stack {
//     constructor() {
//         this.items = [];
//     }

//     push(item) {
//         this.items.push(item);
//     }

//     pop() {
//         if (this.isEmpty()) {
//             throw new Error("Cannot pop from an empty stack");
//         }

//         return this.items.pop();
//     }

//     peek() {
//         if (this.isEmpty()) {
//             throw new Error("Cannot peek an empty stack");
//         }

//         return this.items[this.items.length - 1];
//     }

//     isEmpty() {
//         return this.items.length === 0;
//     }

//     get size() {
//         return this.items.length;
//     }
// }

// const a = new Stack();
// const b = new Stack();

// console.log(a.sayHello === b.sayHello);

// const stack = new Stack();

// stack.push("A");
// stack.push("B");
// stack.push("C");

// console.log(stack.peek());


// function createTimer() {
//     let elapsed = 0;
//     let startTime = null;

//     return {
//         start() {
//             if (startTime !== null) {
//                 throw new Error("Timer already running");
//             }

//             startTime = Date.now();
//         },

//         stop() {
//             if (startTime === null) {
//                 throw new Error("Timer is not running");
//             }

//             elapsed += Date.now() - startTime;
//             startTime = null;
//         },

//         reset() {
//             elapsed = 0;
//             startTime = null;
//         },

//         getElapsed() {
//             return elapsed;
//         }
//     };
// }





// function createTimer() {
//     let elapsed = 0;
//     let startTime = null;

//     return {
//         start() {
//             if (startTime !== null) {
//                 throw new Error("Timer already running");
//             }

//             startTime = Date.now();
//         },

//         stop() {
//             if (startTime === null) {
//                 throw new Error("Timer is not running");
//             }

//             elapsed += Date.now() - startTime;
//             startTime = null;
//         },

//         reset() {
//             elapsed = 0;
//             startTime = null;
//         },

//         getElapsed() {
//             return elapsed;
//         }
//     };
// }


/***
 * 
 */
const orders = [
    { id: 1, customer: "Alice", items: 3, total: 120, status: "completed" },
    { id: 2, customer: "Bob", items: 1, total: 45, status: "pending" },
    { id: 3, customer: "Alice", items: 2, total: 89, status: "completed" },
    { id: 4, customer: "Sara", items: 5, total: 230, status: "completed" },
    { id: 5, customer: "Bob", items: 2, total: 67, status: "cancelled" },
]


const completedOrders = orders.filter(
    order => order.status === "completed"
);

const totalRevenue = completedOrders.reduce(
    (sum, order) => sum + order.total,
    0
);

const orderCount = completedOrders.length;

const averageOrderValue =
    Number((totalRevenue / orderCount).toFixed(2));

const customerTotals = completedOrders.reduce(
    (acc, order) => {
        acc[order.customer] =
            (acc[order.customer] || 0) + order.total;

        return acc;
    },
    {}
);

const topCustomer = Object.entries(customerTotals)
    .reduce((max, current) =>
        current[1] > max[1] ? current : max
    )[0];

const report = {
    totalRevenue,
    orderCount,
    averageOrderValue,
    topCustomer
};

console.log(report);