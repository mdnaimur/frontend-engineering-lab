// console.log(" i am scope");


// // Global scope
// var globalVar = "I am var — on window object";
// let globalLet = "I am let — NOT on window object";
// const globalConst = "I am const — NOT on window object";

// function anyFunction() {
//     console.log(globalVar);   // ✓ accessible
//     console.log(globalLet);   // ✓ accessible
//     console.log(globalConst); // ✓ accessible
// }

// anyFunction();


// var x = 10;
// let y = 20;

// console.log(window.x); // 10  — var attaches to the global object
// console.log(window.y); // undefined — let does NOT attach to window



// function outer() {
//     var x = 10;    // function scoped to outer()
//     let y = 20;    // function scoped to outer()

//     function inner() {
//         var z = 30;  // function scoped to inner()
//         console.log(x); // ✓ — found via scope chain in outer()
//         console.log(y); // ✓ — found via scope chain in outer()
//         console.log(z); // ✓ — found in own scope
//     }

//     inner();
//     console.log(z); // ✗ ReferenceError — z is private to inner()
// }

// outer();


// Real-world: scoped configuration with no global leakage

// const config = Object.freeze({
//     apiUrl: "https://api.example.com",
//     timeout: 5000,
// });

// function createApiClient(baseUrl) {
//     // Function scope: baseUrl is private to this factory
//     let requestCount = 0; // private — not accessible outside

//     function buildHeaders(token) {
//         // Block + function scope: token, headers are local
//         const headers = {
//             "Authorization": `Bearer ${token}`,
//             "Content-Type": "application/json",
//         };
//         return headers;
//         // headers goes out of scope here — eligible for GC
//     }

//     async function get(endpoint, token) {
//         requestCount++; // accesses function scope of createApiClient
//         const url = `${baseUrl}${endpoint}`; // baseUrl from outer scope

//         const response = await fetch(url, {
//             headers: buildHeaders(token), // buildHeaders closes over nothing
//             signal: AbortSignal.timeout(config.timeout), // config from global
//         });

//         if (!response.ok) {
//             throw new Error(`HTTP ${response.status}: ${url}`);
//         }
//         return response.json();
//     }

//     return { get, getRequestCount: () => requestCount };
// }

// const client = createApiClient("https://api.example.com");

// console.dir(client);

// console.log(client.arguments);
// console.log(client.get);
// // requestCount is private — not accessible from outside
// // Only `get` and `getRequestCount` are exposed






let obj1 = { name: "MNR" };
let obj2 = obj1;  // obj2 gets a COPY of the REFERENCE — not the object
obj2.name = "Changed";

console.log(obj1.name); // "Changed" — same object was mutated!
console.log(obj2.name); // "Changed"