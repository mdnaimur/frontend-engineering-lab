console.log("Basic output");
console.warn("Something suspicious");         // yellow — draws attention
console.error("Something broke:");

console.table([                               // renders arrays as a table
    { name: "Alice", score: 90 },
    { name: "Bob", score: 75 }
]);


const user = {
    name: "Naimur",
    role: "admin"
}
console.group("User Details");               // collapsible group
console.log("Name:", user.name);
console.log("Role:", user.role);
console.groupEnd();


async function fetchUsers() {
    // debugger
    const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
    );

    return response.json();
}

async function loadUsers() {
    console.time("fetch-duration");

    try {
        const users = await fetchUsers();
        console.log(users);
    } finally {
        console.timeEnd("fetch-duration");
    }
}

loadUsers();

console.count("buttonClicked");             // counts how many times called
console.trace("Where was this called from?");


console.log("1 — sync");

setTimeout(() => console.log("2 — macrotask"), 0);

Promise.resolve()
    .then(() => console.log("3 — microtask"))
    .then(() => console.log("4 — microtask 2"));

console.log("5 — sync");

// Output order:
// 1 — sync
// 5 — sync
// 3 — microtask      ← Promise queue drains before setTimeout
// 4 — microtask 2    ← still draining microtasks
// 2 — macrotask      ← only now does setTimeout fire