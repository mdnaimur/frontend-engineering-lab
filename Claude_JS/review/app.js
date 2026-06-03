// console.log("i am from review");

// const userName = "naimur"
// console.log(typeof (userName));
// console.log(typeof (true));
// console.log(typeof (100));
// console.log(typeof ({}));
// console.log(typeof ({}));
// console.log(typeof ([]));
// console.log("========================\n");
// console.table((['naimur', 'dalim', 'mango']));
// console.table({ 'name': "naimur", 'roll': 4949 })

// console.time("label");
// let i = 0;
// while (i < 5) {
//     console.log(i);
//     i++; // always make sure the condition eventually becomes false
// }
// console.timeEnd("label");

// const fruits = ["apple", "banana", "mango"];
// console.table(fruits);

// console.time("fruits");
// for (const fruit of fruits) {
//     console.log(fruit)
// }
// console.timeEnd("fruits");



// function greet(name) {
//     return `Hello, ${name}`;
// }


// const message = greet("naimur");
// console.log(message)



// function calculationDiscount(price, discount = 10) {

//     try {

//         const saving = price * discount / 100;
//         const finalPrice = price - saving;
//         return finalPrice;
//     }
//     catch (err) {
//         console.log(err);
//     }

// }

// product_price = 189;
// discountPrice = calculationDiscount(product_price, 23);

// console.log(" price", product_price);
// console.log("discount price", discountPrice);


// const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
// const truncate = (str, maxLength = 50) => str.length > maxLength ? str.slice(0, maxLength) + '...' : str;
// const slugify = str => str.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^\w-]/g, '');

// const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

// const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// const formatCurrency = (amount, currency = 'USD') => new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount);
// const isValidEmail = email => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

// const isValidPassword = password =>
//     password.length >= 8 &&
//     /[A-Z]/.test(password) &&   // has uppercase
//     /[0-9]/.test(password);     // has number

// const unique = arr => [... new Set(arr)];

// const groupBy = (arr, key) =>
//     arr.reduce((groups, item) => {
//         const group = item[key];
//         groups[group] = groups[group] ?? [];
//         groups[group].push(item);
//         return groups;
//     }, {});


// console.log(capitalize("hello world"));         // "Hello world"
// console.log(truncate("This is a long title that goes on forever", 20)); // "This is a long titl..."
// console.log(slugify("Hello World! My Post"))

// console.log(clamp(150, 0, 100));                // 100
// console.log(clamp(-10, 0, 100));                // 0
// console.log(formatCurrency(1999.5));            // "$1,999.50"
// console.log(formatCurrency(1999.5, 'EUR'));

// console.log(isValidEmail("user@example.com"));  // true
// console.log(isValidEmail("not-an-email"));      // false
// console.log(isValidPassword("Secure123"));      // true
// console.log(isValidPassword("weak"));

// console.log(unique([1, 2, 2, 3, 3, 4]));

// const students = [
//     { name: "Ayesha", grade: "A" },
//     { name: "Bilal", grade: "B" },
//     { name: "Sara", grade: "A" },
// ];
// console.log(groupBy(students, "grade"));

// console.log("=====================================")

// const repeat = (str, times) => str.repeat(times);
// console.log(repeat("ha", 3));


// function passwordStrength(password) {
//     let score = 0;

//     if (/[a-z]/.test(password)) score++;
//     if (/[A-Z]/.test(password)) score++;
//     if (/[0-9]/.test(password)) score++;
//     if (/[^a-zA-Z0-9]/.test(password)) score++;

//     if (password.length < 8) {
//         return "weak";
//     }

//     if (score === 4) {
//         return "strong";
//     }

//     if (score >= 2) {
//         return "medium";
//     }

//     return "weak";
// }

// console.log(passwordStrength("abc"));
// console.log(passwordStrength("abc1aA23987456@2"));

// console.log("==================");


const person = {
    name: "md naimur rahman",
    age: 30,
    grade: "A",
    isEnrolled: true,
    address: {
        city: "Dhaka",
        country: "Bangladesh"
    }
}

console.log(person.name);
console.log(person.age);
console.log(person.address.city);
person.email = "mdnaimurr@gmail.com"
// delete person.name;
console.log(person);

const { name, age } = person;

console.log(name)



const bankAccount = {
    owner: "Md Naimur",
    balance: 5000,

    deposite(amount) {
        this.balance += amount;
        console.log(`Deposited ${amount}. New Balance: ${this.balance}`);
    },

    withdraw(amount) {
        if (amount > this.balance) {
            console.log("Insufficient funds");
            return
        }
        this.balance -= amount;

        console.log(`Withdrew ${amount}. New Balance: ${this.balance}`)

    },

    getStatement() {
        return `Account owner: ${this.owner} | Balance: ${this.balance}`;
    }
};

bankAccount.deposite(1000);
bankAccount.deposite(1500);
bankAccount.deposite(15000);
bankAccount.withdraw(5000);
console.log(bankAccount.getStatement());


const scores = [95, 82, 93, 65, 87];
console.log(scores);
console.log(scores[0]);
console.log(scores[scores.length - 1]);

scores.push(55);
scores.push(75);
scores.pop();
scores.shift();

console.log(scores)
console.log(scores.indexOf(65));
console.log(scores.includes(65));

console.log("\n\n\n======================");

const products = [
    { id: 1, name: "Laptop", price: 999, category: "electronics", inStock: true },
    { id: 2, name: "T-Shirt", price: 29, category: "clothing", inStock: true },
    { id: 3, name: "Phone", price: 699, category: "electronics", inStock: false },
    { id: 4, name: "Jeans", price: 59, category: "clothing", inStock: true },
    { id: 5, name: "Tablet", price: 499, category: "electronics", inStock: true },
];



console.table(products);

const inStockItems = products.filter(product => product.inStock);
console.log("\n\n========Stock available =======\n\n");

console.table(inStockItems);

console.log("\n\n========electronics available =======\n\n");

const electronics = products.filter(product => product.category === "electronics");

console.table(electronics);


console.log("\n\n ========affordable  available =======\n\n");

const affordable = products.filter(product => product.price > 100 && product.inStock);

console.table(affordable);


const users = [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" }
];


const manPerson = users.map(p => p.name);
console.log(manPerson);




console.log("\n\n ======== totalValue =======\n\n");

const totalValue = products.reduce((total, p) => total + p.price, 0);
console.log(totalValue);



console.log("\n\n ======== Category Counts =======\n\n");

const categoryCounts = products.reduce((counts, p) => {
    counts[p.category] = (counts[p.category] ?? 0) + 1;
    return counts;
}, {});

console.log(categoryCounts);
console.table(categoryCounts);

const laptop = products.find(p => p.name === "Laptop");
console.log(laptop);

const cheap = products.find(p => p.price < 50);
console.log(cheap);

console.log("\n\n\n ===================sorting============================== \n\n\n");

console.table(products);

const byPrice = [...products].sort((a, b) => a.price - b.price);

console.log("==========after sorting =======");

console.table(byPrice);

const byName = [...products].sort((a, b) => a.name.localeCompare(b.name));

console.log("==========after sorting by name =======");

console.table(byName);


console.log("\n\n\n ===================all togather chaining============================== \n\n\n");

const result = products
    .filter(p => p.inStock && p.category === "electronics")
    .sort((a, b) => b.price - a.price)
    .map(p => `${p.name}: $${p.price}`);

console.table(result);


console.log("\n\n\n ===================json============================== \n\n\n");

const personJson = JSON.stringify(person, null, 4);
console.log(personJson);
console.log(typeof (personJson));

const parse = JSON.parse(personJson);
console.table(parse);