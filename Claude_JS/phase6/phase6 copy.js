console.log(" ❤️1 - Start");

setTimeout(() => {
    console.log("❤️2 - Timeout fired");
}, 2000);

console.log("❤️3 - End");

// Output order:
// "1 - Start"
// "3 - End"
// "2 - Timeout fired"   ← arrives 2 seconds later


// Simple callback
function fetchUserData(userId, onSuccess, onError) {
    setTimeout(() => {
        if (userId > 0) {
            onSuccess({ id: userId, name: "Ayesha", role: "admin" });
        } else {
            onError("Invalid user ID");
        }
    }, 1000); // simulates network delay
}

fetchUserData(
    1,
    (user) => console.log("Got user:", user.name),  // success callback
    (err) => console.log("Error:", err)             // error callback
);


// Creating a Promise
function fetchUser(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (id > 0) {
                resolve({ id, name: "Ayesha", role: "admin" }); // success
            } else {
                reject(new Error("User not found"));             // failure
            }
        }, 1000);
    });
}

// Consuming a Promise — .then() and .catch()
fetchUser(1)
    .then(user => {
        console.log("User:", user.name);  // runs on success
        return user.id;                   // pass data to next .then()
    })
    .then(id => {
        console.log("User ID:", id);      // chaining — no nesting!
    })
    .catch(error => {
        console.error("Failed:", error.message); // runs on any failure above
    })
    .finally(() => {
        console.log("Done — hide loading spinner"); // always runs
    });


// Wait for ALL to finish — fails if any one fails
Promise.all([
    fetchUser(1),
    fetchPosts(1),
    fetchNotifications(1)
]).then(([user, posts, notifications]) => {
    // All three arrived — destructure the results array
    renderDashboard(user, posts, notifications);
}).catch(err => console.error("One of them failed:", err));

// Wait for ALL, never fail — get results/errors for each
Promise.allSettled([
    fetchUser(1),
    fetchPosts(1),
    fetchUnreliableData()
]).then(results => {
    results.forEach(result => {
        if (result.status === 'fulfilled') console.log(result.value);
        if (result.status === 'rejected') console.log(result.reason);
    });
});

// Whichever resolves FIRST wins
Promise.race([fetchFromServer1(), fetchFromServer2()])
    .then(data => console.log("Fastest server won:", data));

// The same fetchUser Promise from above
async function loadUserDashboard(userId) {
    try {
        // await pauses THIS function until the Promise resolves
        // the rest of your app keeps running — nothing is blocked
        const user = await fetchUser(userId);
        const posts = await fetchPosts(user.id);
        const notifications = await fetchNotifications(user.id);

        renderDashboard(user, posts, notifications);

    } catch (error) {
        // catches any rejection from any awaited Promise above
        showError(error.message);

    } finally {
        hideLoadingSpinner();
    }
}

loadUserDashboard(1);

// GET request — basic pattern
async function getUsers() {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');

    // fetch doesn't throw on HTTP errors (404, 500) — you must check manually
    if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
    }

    const users = await response.json(); // parse JSON body — also a Promise
    return users;
}

// POST request — sending data
async function createPost(title, body, userId) {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer your-token-here'  // auth header
        },
        body: JSON.stringify({ title, body, userId })
    });

    if (!response.ok) throw new Error('Failed to create post');
    return await response.json();
}

// DELETE request
async function deletePost(id) {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: 'DELETE'
    });
    if (!response.ok) throw new Error('Failed to delete');
    return true;
}


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
// export const api = {
//     get: (url) => request(url),
//     post: (url, data) => request(url, { method: 'POST', body: data }),
//     put: (url, data) => request(url, { method: 'PUT', body: data }),
//     delete: (url) => request(url, { method: 'DELETE' }),
// };

// // Usage anywhere in your app
// const users = await api.get('/users');
// const post = await api.post('/posts', { title: 'Hello', body: 'World' });

