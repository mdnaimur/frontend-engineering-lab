console.log("i am from review");

const userName = "naimur"
console.log(typeof (userName));
console.log(typeof (true));
console.log(typeof (100));
console.log(typeof ({}));
console.log(typeof ({}));
console.log(typeof ([]));
console.log("========================\n");
console.table((['naimur', 'dalim', 'mango']));
console.table({ 'name': "naimur", 'roll': 4949 })

console.time("label");
let i = 0;
while (i < 5) {
    console.log(i);
    i++; // always make sure the condition eventually becomes false
}
console.timeEnd("label");

const fruits = ["apple", "banana", "mango"];
console.table(fruits);

console.time("fruits");
for (const fruit of fruits) {
    console.log(fruit)
}
console.timeEnd("fruits");

