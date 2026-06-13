// function task(message) {
//     // emulate time consuming task
//     let n = 10000000000;
//     while (n > 0) {
//         n--;
//     }
//     console.log(message);
// }

// console.log('Start script...');
// task('Call an API');
// console.log('Done!');


// console.log('Start script...');

// setTimeout(() => {
//     task('Download a file.');
// }, 1000);

// console.log('Done!');


// console.log('Hi!');

// setTimeout(() => {
//     console.log('Execute immediately.');
// }, 0);

// console.log('Bye!');

// var LANGUAGE = 'Java';
// var language = 'JavaScript';

// console.log(language)

// function getLanguage() {
//     if (!language) {
//         console.log(language)
//         var language = LANGUAGE;
//     }

//     return language;
// }


// console.log(`I lve ${getLanguage()}`)


// var name = "Naim";

// function show() {
//     console.log(name);

//     var name = "Rahman";

//     console.log(name);
// }

// console.dir(show);

// let persons = new Array();

// console.log(persons)

// console.log(Array.prototype);


// var f = function p() {

// };
// console.dir(f);

// console.log("1 --> start")

// setTimeout(() => {
//     console.log("2 --> inside Timeout ")
// }, 2000)


// console.log("3 ---> end ");


// function fetchUserData(userId, onSuccess, onError) {
//     setTimeout(() => {
//         if (userId > 0) {
//             onSuccess({ id: userId, name: "Bangladesh", role: "admin" })
//         }
//         else {
//             onError("Invalid User Id");
//         }
//     }, 1000)
// }


// fetchUserData(

// 1,
//     (user) => console.log("Got user: ", user.name),
//     (err) => console.log("Error:", err)
// );


// function fetchUser(id) {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             if (id > 0) {
//                 resolve({ id, name: "Naimur", role: "admin" })
//             }

//             else {
//                 reject(new Error("user not found"));
//             }
//         }, 1000)
//     })
// }


// fetchUser(5)
//     .then(user => {
//         console.log("User:", user.name);  // runs on success
//         return user.id;                   // pass data to next .then()
//     })
//     .then(id => {
//         console.log("User ID:", id);      // chaining — no nesting!
//     })
//     .catch(error => {
//         console.error("Failed:", error.message); // runs on any failure above
//     })
//     .finally(() => {
//         console.log("Done — hide loading spinner"); // always runs
//     });



// async function getUsers() {
//     const response = await fetch('https://jsonplaceholder.typicode.com/users');

//     console.dir(response);

//     if (!response.ok) {
//         throw new Error(`HTTP error: ${response.status}`);
//     }

//     const users = await response.json(); // parse JSON body — also a Promise
//     return users;
// }

// let user = getUsers();

// console.log(user);


// async function createPost(title, body, userId) {
//     const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             'Authorization': 'Bearer your-token-here'  // auth header
//         },
//         body: JSON.stringify({ title, body, userId })
//     });

//     if (!response.ok) throw new Error('Failed to create post');
//     return await response.json();
// }

// // DELETE request
// async function deletePost(id) {
//     const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
//         method: 'DELETE'
//     });
//     if (!response.ok) throw new Error('Failed to delete');
//     return true;
// }



// api.js — used across your entire application
const BASE_URL = 'https://jsonplaceholder.typicode.com';

async function request(endpoint, options = {}) {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            ...options.headers
        },
        ...options
    };

    if (config.body && typeof config.body === 'object') {
        config.body = JSON.stringify(config.body);
    }

    const response = await fetch(`${BASE_URL}${endpoint}`, config);

    if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.message || `Request failed: ${response.status}`);
    }

    // handle empty responses (like DELETE returning 204)
    const text = await response.text();
    return text ? JSON.parse(text) : null;
}

// Clean API layer — callers never touch fetch directly
const api = {
    get: (url) => request(url),
    post: (url, data) => request(url, { method: 'POST', body: data }),
    put: (url, data) => request(url, { method: 'PUT', body: data }),
    delete: (url) => request(url, { method: 'DELETE' }),
};

// Usage anywhere in your app
const users = api.get('/users');
const post = api.post('/posts', { title: 'Hello', body: 'World' });

console.log(users);
console.log(post);