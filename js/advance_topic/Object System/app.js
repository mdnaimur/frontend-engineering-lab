console.log('-----------------------');


// Lexical Environment

// let x = 10;

// function greet(name) {
//     let message = "Hello, " + name;
//     return message;
// }


// let result = greet("MNR");

// console.log(result);
// console.dir(result);

// function createLogger(prefix) {

//     return {
//         info: (msg) => console.log(`[${prefix}] INFO: ${msg}`),
//         warn: (msg) => console.log(`[${prefix}] WARN: ${msg}`),
//         error: (msg) => console.log(`[${prefix}] ERROR: ${msg}`)
//     }
// }

// const authLogger = createLogger("AUTH");
// const dbLogger = createLogger("DB");

// console.log(authLogger);
// console.dir(authLogger);
// console.dir(dbLogger);
// console.log(dbLogger);

// authLogger.info("User logged in");    // [AUTH] INFO: User logged in
// dbLogger.error("Connection timeout");


// let x = 10;




// // Line 2
// function outer() {
//     // outer stored in GlobalLexEnv during creation phase — already there

//     // Line 3
//     let y = 20;
//     // outerLexEnv.EnvironmentRecord.y = 20

//     // Line 4
//     function inner() {
//         // innerFn stored in outerLexEnv during outer's creation phase

//         // Line 5
//         console.log(x, y);
//         // Engine looks up x: not in innerLexEnv → walks outer → walks GlobalLexEnv → found: 10
//         // Engine looks up y: not in innerLexEnv → walks outer (outerLexEnv) → found: 20
//     }

//     inner(); // creates innerLexEnv, outer → outerLexEnv
// }

// outer(); //

// function rateLimiter(maxRequests) {
//     let count = 0; // lives in rateLimiter's LexEnv

//     return (req, res, next) => {
//         // This middleware closes over rateLimiter's LexEnv
//         if (++count > maxRequests) {
//             return res.status(429).json({ error: "Too many requests" });
//         }
//         next();
//     };
// }

// app.use(rateLimiter(100));


// let x = "global";

// function outer() {
//     let x = "outer";
//     return function inner() {
//         console.log(x); // "outer" — not "global"
//     };
// }

// const fn = outer();
// fn(); // logs "outer" — the outer reference was set when inner was DEFINED


// function makeAdder(x) {
//     return function (y) {
//         return x + y;
//     };
// }

// const add5 = makeAdder(5);
// const add10 = makeAdder(10);

// console.log(add5(3));   // ?
// console.log(add10(3));  // ?
// console.log(add5(3) === add10(3)); // ?



// console.dir(add5);   // ?
// console.dir(add10);  // ?
// console.dir(add5(3) === add10(3));


// function c() {
//     return "done";
// }

// function b() {
//     return c();
// }

// function a() {
//     return b();
// }

// console.log(a());


// function divide(a, b) {
//     if (b === 0) throw new Error("Division by zero");
//     return a / b;
// }

// function calculateAverage(numbers) {
//     const sum = numbers.reduce((acc, n) => acc + n, 0);
//     console.log(`Sum is : ${sum}`);
//     return divide(sum, numbers.length);
// }

// function processScores(scores) {
//     const filtered = scores.filter(s => s > 0);
//     console.log(`filtered data: ${filtered}`);
//     return calculateAverage(filtered);
// }

// const result = processScores([10, 20, 30]);
// // const result = processScores([-1, -2, -3]);
// console.log(result);