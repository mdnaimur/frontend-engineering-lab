console.log("I am wokring inside the apps")

function greet(name) {
    const message = buildeMessage(name); // another function
    console.log(message);
}


function buildeMessage(name) {
    return `Hello,  ${name}. How are you`;


}

greet('md naimur rahman');


// console.log("1")
// setTimeout(() => console.log("2"), 2000);
// console.log("3");

// function infinite() {
//     let total = 0;
//     return infinite();

// }
// infinite();


function applyTax(price) {
    const tax = .25;

    return (price + price * tax);

}

function calculateTotal(prices) {

    let sum = 0;
    for (let i = 0; i < prices.length; i++) {
        // console.log(" individual price", prices[i]);
        let taxPrice = applyTax(prices[i]);
        // console.log(" After Calculated tax", taxPrice);
        // sum += prices[i];
        sum += taxPrice;
        //console.log(' i am sum inside\n', sum);
    }
    //console.log('outside sum: ', sum);
    return sum;
}

let storeTotal = calculateTotal([100, 200, 50]);
console.log(storeTotal);

console.log("\n------------------------------------------\n");

const items = new Array(500000).fill(0);

// for (let i = 0; i < items.length; i++) {
//     console.log("item is: ", items[i] * 2);
// }

// let index = 0;
// const chunkSize = 1000;
// function procceeChuck() {
//     const end = Math.min(index + chunkSize, items.length);
//     console.log(" End value: ", end);

//     for (let i = index; i < end; i++) {
//         console.log("  I am working inside loop optimize:", items[i]);
//     }

//     index = end;
//     console.log(' after finishing the loop Index: ', index);
//     if (index < items.length) {
//         setTimeout(procceeChuck, 0);
//     }
//     else {
//         console.log("finishing the processing ..... thanks!!")
//     }
// }


// procceeChuck();


// console.log("1 — Start");                          // A

// setTimeout(function onTimeout() {                   // B
//     console.log("2 — setTimeout callback");
// }, 0);

// console.log("3 — End");                            // C

// Output:
// 1 — Start
// 3 — End
// 2 — setTimeout callback   ← even with 0ms delay!



// console.log("1 — Start");

// setTimeout(() => console.log("2 — Macrotask"), 0);    // Macrotask Queue

// Promise.resolve().then(() => console.log("3 — Microtask")); // Microtask Queue

// console.log("4 — End");

// Output:
// 1 — Start
// 4 — End
// 3 — Microtask    ← Promise ran BEFORE setTimeout
// 2 — Macrotask


// console.log("1");

// setTimeout(() => console.log("2 — timeout 1"), 0);
// setTimeout(() => console.log("3 — timeout 2"), 0);

// Promise.resolve()
//     .then(() => console.log("4 — promise 1"))
//     .then(() => console.log("5 — promise 2")); // chained microtask

// console.log("6");

// Output:
// 1
// 6
// 4 — promise 1     ← microtasks drain completely first
// 5 — promise 2     ← chained microtask also runs before macrotasks
// 2 — timeout 1     ← then macrotasks run one by one
// 3 — timeout 2+


// Test your understanding of queue order live:
// console.log("sync 1");
// queueMicrotask(() => console.log("microtask"));
// setTimeout(() => console.log("macrotask"), 0);
// console.log("sync 2");
// Predict the output before running it


// console.log("A");

// setTimeout(() => console.log("B"), 0);

// Promise.resolve()
//     .then(() => {
//         console.log("C");
//         setTimeout(() => console.log("D"), 0);
//     })
//     .then(() => console.log("E"));

// setTimeout(() => console.log("F"), 0);

// console.log("G");


const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(function (num) {
    return num * 2;
});

// console.log(doubled);

/*
*
* Phase 2
*/
console.log("\n------------------------------------------\n");
console.log("\n------------------------------------------\n");

// console.log('Placing order....');

// setTimeout(function onOrderReady() {
//     console.log("Order is ready!!");
// }, 2000);

// console.log("Wating for Order");


// function readUserFromDB(userId, callback) {
//     setTimeout(function () {
//         if (userId <= 0) {
//             callback(new Error("Invalid user id"), null);
//         }
//         else {
//             callback(null, { id: userId, name: "Rahman" });
//         }
//     }, 2000)
// }

// using it



// readUserFromDB(1, function (error, user) {
//     if (error) {
//         console.log("Failed", error.message);
//         return;
//     }
//     console.log("got user:", user.name);
// });



// Real scenario: Login → get user → get their orders → get order details
// Each step depends on the previous result

// const worker = new Worker("worker.js");

// worker.postMessage(data);

// worker.onmessage = (e) => {
//     console.log("Done:", e.data);
// };

// loginUser("rahim@email.com", "password123", function (err, user) {
//     if (err) { console.error(err); return; }

//     getUserProfile(user.id, function (err, profile) {
//         if (err) { console.error(err); return; }

//         getOrders(profile.id, function (err, orders) {
//             if (err) { console.error(err); return; }

//             getOrderDetails(orders[0].id, function (err, details) {
//                 if (err) { console.error(err); return; }

//                 // Finally have what we need — buried 4 levels deep
//                 console.log("Order details:", details);

//                 // Need one more thing? Add another level...
//                 updateOrderStatus(details.id, "viewed", function (err, result) {
//                     if (err) { console.error(err); return; }
//                     console.log("Status updated");
//                     // → the pyramid keeps growing rightward
//                 });
//             });
//         });
//     });
// });

// // ✅ Named functions instead of anonymous — better traces, reusable
// function onUserLoaded(err, user) {
//     if (err) { handleError(err); return; }
//     renderUser(user);
// }
// getUser(id, onUserLoaded);

// // ✅ Centralized error handler — don't repeat error logic everywhere
// function handleError(err) {
//     console.error("[App Error]", err.message);
//     showErrorToUser(err.message);
//     logToMonitoringService(err);
// }

// // ✅ Avoid nesting — use named functions to flatten callback hell
// function onLoginDone(err, user) {
//     if (err) { handleError(err); return; }
//     getUserProfile(user.id, onProfileLoaded);
// }

// function onProfileLoaded(err, profile) {
//     if (err) { handleError(err); return; }
//     getOrders(profile.id, onOrdersLoaded);
// }

// function onOrdersLoaded(err, orders) {
//     if (err) { handleError(err); return; }
//     console.log("Orders:", orders);
// }

// // Clean entry point — flat, readable
// loginUser("rahim@email.com", "password", onLoginDone);


// Implement these three functions using setTimeout to simulate async:

// function validateCredentials(email, password, callback) {
//     // Simulate 500ms DB check
//     // If email is "admin@test.com" and password is "1234" → success
//     // Otherwise → callback(new Error("Invalid credentials"), null)

//     setTimeout(function () {
//         if (email === "admin@test.com" && password === "1234") {
//             const user = { id: 1, email };
//             callback(null, user);
//         }
//         else {
//             callback(new Error("Invalid credentials"), null);
//         }
//     }, 2000);
// }

// function validateCredentials(email, password, callback) {

//     // Simulate DB check
//     setTimeout(function () {

//         if (email === "admin@test.com" && password === "1234") {

//             const user = {
//                 id: 1,
//                 email
//             };

//             callback(null, user);

//         } else {

//             callback(new Error("Invalid credentials"), null);

//         }

//     }, 500);
// }


// function fetchUserPermissions(userId, callback) {

//     // Simulate API request
//     setTimeout(function () {

//         const result = {
//             userId,
//             permissions: ["read", "write"]
//         };

//         callback(null, result);

//     }, 300);
// }


// function logUserActivity(userId, action, callback) {

//     // Simulate logging service
//     setTimeout(function () {

//         const result = {
//             logged: true,
//             action,
//             timestamp: Date.now()
//         };

//         callback(null, result);

//     }, 200);
// }

// // Then call them in sequence:
// // validateCredentials → fetchUserPermissions → logUserActivity
// // Handle errors at every step
// // Final output: "Login complete. Permissions: read, write. Activity logged."

// validateCredentials(
//     "admin@test.com",
//     "12304",

//     function (error, user) {

//         if (error) {
//             console.error(error.message);
//             return;
//         }

//         console.log("User validated:", user);

//         fetchUserPermissions(user.id, function (error, permissionsData) {

//             if (error) {
//                 console.error(error.message);
//                 return;
//             }

//             console.log("Permissions fetched:", permissionsData);

//             logUserActivity(
//                 user.id,
//                 "LOGIN",

//                 function (error, logResult) {

//                     if (error) {
//                         console.error(error.message);
//                         return;
//                     }

//                     console.log("Activity logged:", logResult);

//                     console.log(
//                         `Login complete. Permissions: ${permissionsData.permissions.join(", ")}. Activity logged.`
//                     );

//                 }
//             );

//         });

//     }
// );

// validateCredentials(
//     "admin@test.com",
//     "1234",
//     (err, user) => {
//         console.log(err);
//         console.log(user);
//     }
// );
// console.log("\n------------------------------------------\n");
// function greet(callback = () => { }) {
//     console.log("Step 1: inside greet");

//     setTimeout(() => {
//         console.log("Step 2: async done");
//         callback(); // 👈 THIS is the key
//     }, 1000);
// }

// function sayBye() {
//     console.log("Step 3: goodbye");
// }

// greet(sayBye);

// function validateCredentials(email, password) {
//     return new Promise(function (resolve, reject) {
//         setTimeout(() => {
//             if (email === "naimur@test.com" && password === "1234") {
//                 resolve({ id: 1, email });
//             }
//             else {
//                 reject(new Error("Invalid Credentials"));
//             }
//         }, 1000);
//     })
// }

// const promise = validateCredentials("naimur@test.com", "1234");
// console.log(promise);


// validateCredentials("naimur@test.com", "1234")
//     .then(function (user) {
//         console.log("Loogged In", user);
//     })
//     .catch(function (error) {
//         console.error("Failed", error.message);
//     })
//     .finally(function () {
//         console.info("Auth attemp complete");
//     })


// // Callback version (from Phase 2) — nested, messy
// loginUser(email, pass, function (err, user) {
//     getUserProfile(user.id, function (err, profile) {
//         getOrders(profile.id, function (err, orders) {
//             // buried 3 levels deep
//         });
//     });
// });

// // ✅ Promise version — flat, readable, elegant
// loginUser(email, pass)
//     .then(user => getUserProfile(user.id))    // returns a new promise
//     .then(profile => getOrders(profile.id))   // chains onto that promise
//     .then(orders => console.log(orders))      // chains further
//     .catch(error => console.error(error));    // catches ANY error above



console.log("\n------------------------------------------\n");
// function validateCredentials(email, password) {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             if (email === "admin@test.com" && password === "1234") {
//                 resolve({ id: 1, email });
//             } else {
//                 reject(new Error("Invalid credentials"));
//             }
//         }, 500);
//     });
// }

// function fetchUserPermissions(userId) {
//     return new Promise((resolve) => {
//         setTimeout(() => {
//             resolve({ userId, permissions: ["read", "write"] });
//         }, 300);
//     });
// }

// function logUserActivity(userId, action) {
//     return new Promise((resolve) => {
//         setTimeout(() => {
//             resolve({ logged: true, action, timestamp: Date.now() });
//         }, 200);
//     });
// }

// // ✅ Clean flat chain — compare this to Phase 2's pyramid
// validateCredentials("admin@test.com", "1234")
//     .then(user => {
//         console.log("User validated:", user);
//         return fetchUserPermissions(user.id); // return the next promise
//     })
//     .then(permissionsData => {
//         console.log("Permissions:", permissionsData.permissions);
//         return logUserActivity(permissionsData.userId, "LOGIN");
//     })
//     .then(logResult => {
//         console.log("Activity logged:", logResult);
//         console.log("Login complete.");
//     })
//     .catch(error => {
//         // ONE handler catches errors from ANY step above
//         console.error("Auth failed:", error.message);
//     })
//     .finally(() => {
//         console.log("Auth flow complete");
//     });



// function getUser(id) {
//     return new Promise(resolve => {
//         setTimeout(() => resolve({
//             id, name: "Md Naimur Rahman"
//         }), 300);
//     });
// }

// function getNotifications(userid) {
//     return new Promise(resolve => {
//         setTimeout(() => resolve([

//             { id: 1, message: "New message" },
//             { id: 2, message: "Order shipped" }
//         ], 200))
//     });
// }

// function getDashboardStats(userId) {
//     return new Promise(resolve => {
//         setTimeout(() => resolve(
//             {
//                 totalOrder: 454,
//                 revenue: 223034
//             }
//         ), 400);
//     });
// }

// // ✅ Run all three IN PARALLEL — wait for all
// // Promise.all([
// //     getUser(1),
// //     getNotifications(1),
// //     getDashboardStats(1)
// // ])
// //     .then(([user, notifications, stats]) => {
// //         // results array matches INPUT order — not completion order
// //         // even though getNotifications finished first (200ms)
// //         // user is always index 0, notifications index 1, stats index 2
// //         console.log("User:", user);
// //         console.log("Notifications:", notifications);
// //         console.log("Stats:", stats);
// //     })
// //     .catch(error => {
// //         // If ANY of the three rejects → comes here immediately
// //         // Other promises keep running but their results are ignored
// //         console.error("Dashboard load failed:", error.message);
// //     });


// console.log("\n\n\n\n -----------------------------------\n\n\n")
// // Same functions — one will fail
// Promise.allSettled([
//     getUser(1),           // fulfills
//     getNotifications(1),  // rejects
//     getDashboardStats(1)  // fulfills
// ])
//     .then(results => {
//         // results is always an array — one entry per promise
//         // Each entry has a "status" field: "fulfilled" or "rejected"
//         console.log(results);
//         // [
//         //   { status: "fulfilled", value: { id: 1, name: "Rahim" } },
//         //   { status: "rejected",  reason: Error("Notifications service down") },
//         //   { status: "fulfilled", value: { totalOrders: 42 } }
//         // ]

//         // ✅ Production pattern — handle each result individually
//         results.forEach((result, index) => {
//             if (result.status === "fulfilled") {
//                 console.log(`Request ${index} succeeded:`, result.value);
//             } else {
//                 console.warn(`Request ${index} failed:`, result.reason.message);
//             }
//         });
//     })
// // .catch() is almost never needed with allSettled
// // it only rejects if you pass something that isn't a Promise


// async function loadDashboard(userId) {
//     showLoadingSpinner();

//     const [userResult, notifsResult, statsResult] = await Promise.allSettled([
//         getUser(userId),
//         getNotifications(userId),
//         getDashboardStats(userId)
//     ]);

//     // Render what succeeded, show fallback for what failed
//     if (userResult.status === "fulfilled") {
//         renderUserProfile(userResult.value);
//     } else {
//         renderErrorBanner("Could not load profile");
//     }

//     if (notifsResult.status === "fulfilled") {
//         renderNotifications(notifsResult.value);
//     } else {
//         renderEmptyNotifications(); // graceful fallback
//     }

//     if (statsResult.status === "fulfilled") {
//         renderStats(statsResult.value);
//     } else {
//         renderStatsUnavailable();
//     }

//     hideLoadingSpinner();
// }


// // Classic use case: multiple API sources, use whichever responds first
// function fetchFromPrimaryAPI() {
//     return new Promise((resolve, reject) =>
//         setTimeout(() => reject(new Error("Primary API down")), 100)
//     );
// }

// function fetchFromSecondaryAPI() {
//     return new Promise(resolve =>
//         setTimeout(() => resolve({ source: "secondary", data: [1, 2, 3] }), 200)
//     );
// }

// function fetchFromFallbackAPI() {
//     return new Promise(resolve =>
//         setTimeout(() => resolve({ source: "fallback", data: [1, 2, 3] }), 400)
//     );
// }

// // Try all three — use whichever succeeds first
// Promise.any([
//     fetchFromPrimaryAPI(),    // rejects at 100ms
//     fetchFromSecondaryAPI(),  // fulfills at 200ms ← winner
//     fetchFromFallbackAPI()    // fulfills at 400ms — ignored
// ])
//     .then(result => {
//         console.log("Got data from:", result.source);
//         // → "Got data from: secondary"
//     })
//     .catch(error => {
//         // Only runs if ALL THREE reject
//         // error is an AggregateError containing all three errors
//         console.error("All sources failed:", error.errors);
//     });

// // ✅ Tag each promise for easier debugging
// Promise.allSettled([
//     getUser(1).then(u => ({ type: "user", data: u })),
//     getNotifications(1).then(n => ({ type: "notifications", data: n })),
//     getStats(1).then(s => ({ type: "stats", data: s }))
// ])
//     .then(results => {
//         results.forEach(r => {
//             if (r.status === "rejected") {
//                 console.error(`[${r.value?.type ?? "unknown"}] failed:`, r.reason);
//             }
//         });
//     });

// // ✅ Measure parallel vs sequential timing in devtools
// console.time("parallel");
// await Promise.all([getUser(1), getNotifications(1), getStats(1)]);
// console.timeEnd("parallel"); // → parallel: 400ms

// console.time("sequential");
// await getUser(1);
// await getNotifications(1);
// await getStats(1);
// console.timeEnd("sequential"); // → sequential: 900ms



// ✅ Decision framework — which utility to use:
//
//  Need ALL results AND all must succeed?     → Promise.all
//  Need ALL results, failures are ok?         → Promise.allSettled
//  Need FASTEST result, any outcome?          → Promise.race
//  Need FIRST SUCCESS, failures are ok?       → Promise.any
//  Operations depend on each other?           → sequential await
//  Operations are independent?                → Promise.all

// ✅ Always add timeout protection in production

// ✅ Tag each promise for easier debugging
// Promise.allSettled([
//     getUser(1).then(u => ({ type: "user", data: u })),
//     getNotifications(1).then(n => ({ type: "notifications", data: n })),
//     getStats(1).then(s => ({ type: "stats", data: s }))
// ])
//     .then(results => {
//         results.forEach(r => {
//             if (r.status === "rejected") {
//                 console.error(`[${r.value?.type ?? "unknown"}] failed:`, r.reason);
//             }
//         });
//     });

// ✅ Measure parallel vs sequential timing in devtools
// console.time("parallel");
// await Promise.all([getUser(1), getNotifications(1), getStats(1)]);
// console.timeEnd("parallel"); // → parallel: 400ms

// console.time("sequential");
// await getUser(1);
// await getNotifications(1);
// await getStats(1);
// console.timeEnd("sequential"); // → sequential: 900ms



// function withTimeout(promise, ms, label = "Request") {
//     const timeout = new Promise((_, reject) =>
//         setTimeout(() => reject(new Error(`${label} timed out after ${ms}ms`)), ms)
//     );
//     return Promise.race([promise, timeout]);
// }

// // ✅ Production dashboard loader
// async function loadDashboard(userId) {
//     showLoadingSpinner();

//     try {
//         const user = await withTimeout(getUser(userId), 3000, "getUser");

//         const [posts, notifications, stats] = await Promise.allSettled([
//             withTimeout(getUserPosts(user.id), 3000, "getPosts"),
//             withTimeout(getNotifications(user.id), 3000, "getNotifications"),
//             withTimeout(getStats(user.id), 3000, "getStats")
//         ]);

//         return buildDashboard(user, posts, notifications, stats);

//     } catch (error) {
//         // Only triggers if getUser fails or times out
//         // allSettled below it never throws
//         showErrorPage(error.message);
//     } finally {
//         hideLoadingSpinner();
//     }
// }




// await can only be used INSIDE an async function
// It pauses the function until the Promise settles

// async function loadDashboard() {

//     console.log("1 — starting");          // runs immediately

//     const user = await getUser(1);        // function pauses here
//     // control returns to caller
//     // resumes when getUser resolves

//     console.log("2 — got user:", user);   // runs after resume

//     const posts = await getUserPosts(user.id); // pauses again

//     console.log("3 — got posts:", posts); // runs after second resume

//     return { user, posts };
// }

// // Execution flow:
// loadDashboard();
// console.log("4 — called loadDashboard");

// Output:
// 1 — starting          ← sync, before first await
// 4 — called loadDashboard  ← caller continues while function is paused
// 2 — got user: {...}   ← resumes after getUser resolves
// 3 — got posts: [...]  ← resumes after getUserPosts resolves



// async function syncUserData(userIds) {
//     const results = [];

//     for (const id of userIds) {
//         const user = await fetchUser(id);
//         const saved = await saveToDatabase(user);
//         results.push(saved);
//     }

//     return results;
// }

// const saved = await syncUserData([1, 2, 3, 4, 5]);
// console.log(saved.length); // expects 5 — always gets 0

// Simplest possible fetch
// fetch("https://jsonplaceholder.typicode.com/users/1")
//     .then(response => {
//         console.log(response);          // Response object — not your data yet
//         console.log(response.status);   // 200
//         console.log(response.ok);       // true (status 200-299)
//         return response.json();         // read body → returns another Promise
//     })
//     .then(user => {
//         console.log(user); // { id: 1, name: "Leanne Graham", ... }
//     })
//     .catch(err => {
//         // Only fires on NETWORK errors:
//         // - no internet connection
//         // - DNS failure
//         // - request blocked by CORS
//         // NOT on 404, 500, etc.
//         console.error("Network error:", err.message);
//     });

const BASE_URL = "https://jsonplaceholder.typicode.com";

// ── CORE REQUEST WRAPPER ─────────────────────────────────────
async function request(url, options = {}) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);

    try {
        const response = await fetch(`${BASE_URL}${url}`, {
            ...options,
            signal: controller.signal
        });

        clearTimeout(timeout);

        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }

        const contentType = response.headers.get("content-type");

        if (contentType && contentType.includes("application/json")) {
            return await response.json();
        }

        return null;

    } catch (err) {
        clearTimeout(timeout);
        throw err;
    }
}


// ── GET ─────────────────────────────────────────────────────
async function getUser(id) {
    return request(`/users/${id}`);
}


// ── POST ────────────────────────────────────────────────────
async function createPost(postData) {
    return request(`/posts`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(postData)
    });
}


// ── PUT (full update) ───────────────────────────────────────
async function updateUser(id, userData) {
    return request(`/users/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
    });
}


// ── PATCH (partial update) ──────────────────────────────────
async function updateUserEmail(id, email) {
    return request(`/users/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email })
    });
}


// ── DELETE ───────────────────────────────────────────────────
async function deletePost(id) {
    await request(`/posts/${id}`, {
        method: "DELETE"
    });

    return { success: true, deletedId: id };
}


// ── USAGE (IMPORTANT FIX: no top-level await) ───────────────
async function main() {
    const newPost = await createPost({
        title: "Understanding fetch",
        body: "fetch returns a Promise...",
        userId: 1
    });

    console.log(newPost);

    const user = await getUser(1);
    console.log(user);

    const updated = await updateUserEmail(1, "test@example.com");
    console.log(updated);
}

main().catch(console.error);


// dashboard.js
// Only talks to services — never touches fetch or apiClient
// Pure business logic and rendering

// import { HttpError, NetworkError, TimeoutError } from "./errors.js";
// import { postService } from "./postService.js";
// import { userService } from "./userService.js";

// async function loadDashboard(userId) {
//     showLoadingSpinner();
//     console.time("dashboard");

//     try {
//         // Step 1: user is critical — fail fast if unavailable
//         const user = await userService.getById(userId);

//         // Step 2: remaining data — parallel, partial failure ok
//         const [postsResult, allPostsResult] = await Promise.allSettled([
//             userService.getPosts(userId),
//             postService.getAll()
//         ]);

//         // Step 3: extract with fallbacks
//         const posts = postsResult.status === "fulfilled"
//             ? postsResult.value
//             : [];

//         const allPosts = allPostsResult.status === "fulfilled"
//             ? allPostsResult.value
//             : [];

//         // Step 4: log what failed (for monitoring)
//         if (postsResult.status === "rejected") {
//             console.warn("User posts unavailable:", postsResult.reason.message);
//         }

//         console.timeEnd("dashboard");

//         // Step 5: render
//         renderDashboard({ user, posts, allPosts });

//     } catch (err) {
//         // Handle specific error types differently
//         if (err instanceof TimeoutError) {
//             showErrorBanner("Dashboard is taking too long. Please try again.");
//             return;
//         }

//         if (err instanceof HttpError) {
//             if (err.status === 401) { redirectToLogin(); return; }
//             if (err.status === 404) { showNotFound("User not found"); return; }
//             showErrorBanner(`Server error: ${err.body?.error ?? err.message}`);
//             return;
//         }

//         if (err instanceof NetworkError) {
//             showErrorBanner("No internet connection. Check your network.");
//             return;
//         }

//         // Unexpected error — rethrow for global error handler
//         throw err;

//     } finally {
//         hideLoadingSpinner(); // ALWAYS runs
//     }
// }


// function renderDashboard({ user, posts, allPosts }) {
//     console.log("═══════════════════════════════");
//     console.log("       USER DASHBOARD          ");
//     console.log("═══════════════════════════════");
//     console.log(`User:   ${user.name}`);
//     console.log(`Email:  ${user.email}`);
//     console.log(`Posts:  ${posts.length} personal posts`);
//     console.log(`Feed:   ${allPosts.length} total posts`);
//     console.log("═══════════════════════════════");
// }

// function showLoadingSpinner() { console.log("⏳ Loading..."); }
// function hideLoadingSpinner() { console.log("✓ Done"); }
// function showErrorBanner(msg) { console.error("❌", msg); }
// function showNotFound(msg) { console.warn("🔍", msg); }
// function redirectToLogin() { console.log("→ /login"); }


// // Run it
// loadDashboard(1);