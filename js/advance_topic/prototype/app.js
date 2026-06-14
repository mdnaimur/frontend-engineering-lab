// let person = {};


// person.name = "Naimur";
// person.age = 30;

// person.eat = function () {
//     console.log(`Person is eating`);
// }

// person.sleep = function () {
//     console.log(`person is sleeping ...`);
// }

// console.log(person);






// function Person(name, age) {
//     let person = {};


//     person.name = name;
//     person.age = age;

//     person.eat = function () {
//         console.log(`Person is eating`);
//     }

//     person.sleep = function () {
//         console.log(`person is sleeping ...`);
//     }

//     //console.log(person);

//     return person;
// }

// let p = Person('Naimur', 25);

// console.dir(p);

// const personMethods = {
//     eat() {
//         console.log(`Person is eating`);
//     },

//     sleep() {
//         console.log(`person is sleeping ...`);
//     },

//     play() {
//         console.log(`Person is playing `)
//     }

// }


// function Person(name, age) {
//     let person = {};


//     person.name = name;
//     person.age = age;

//     person.eat = personMethods.eat;
//     person.sleep = personMethods.sleep;
//     person.play = personMethods.play;




//     //console.log(person);

//     return person;
// }

// let p = Person('Naimur', 25);

// console.log(p.play());
// console.dir(p);


// const captain = {
//     name: 'Naimur',
//     age: 29,
//     country: 'Bangladesh'
// }

// const player = Object.create(captain);
// console.log(player);
// console.dir(player);
// console.log(player.name);


// const personMethods = {
//     eat() {
//         console.log(`Person is eating`);
//     },

//     sleep() {
//         console.log(`person is sleeping ...`);
//     },

//     play() {
//         console.log(`Person is playing `)
//     }

// }


// function Person(name, age) {
//     let person = Object.create(personMethods);


//     person.name = name;
//     person.age = age;

//     // person.eat = personMethods.eat;
//     // person.sleep = personMethods.sleep;
//     // person.play = personMethods.play;




//     //console.log(person);

//     return person;
// }

// let p = Person('Naimur', 25);

// console.log(p.play());
// console.dir(p);


// function test() { }

// console.log(test);
// console.log(test.prototype);
// console.dir(test);



// function Person(name, age) {
//     let person = Object.create(Person.prototype);


//     person.name = name;
//     person.age = age;


//     return person;
// }


// Person.prototype = {
//     eat() {
//         console.log(`Person is eating`);
//     },

//     sleep() {
//         console.log(`person is sleeping ...`);
//     },

//     play() {
//         console.log(`Person is playing `)
//     }
// }

// let p = Person('Naimur', 25);

// // console.log(p.play());
// p.play();
// console.dir(p);


// function PersonWithNew(name, age) {
//     // let person = Object.create(Person.prototype);


//     this.name = name;
//     this.age = age;


//     // return person;
// }

// let naimur = new PersonWithNew('Naimur', 25);

// // console.log(p.play());
// // naimur.play();
// console.dir(naimur);


// class PersonClass {
//     constructor(name, age) {
//         this.name = name;
//         this.age = age;
//     }

//     eat() {
//         console.log(`Person is eating`);
//     }

//     sleep() {
//         console.log(`person is sleeping ...`);
//     }

//     play() {
//         console.log(`Person is playing `)
//     }


// }


// const salman = new PersonClass("Salman Ahmed", 32);

// console.log(`I am class ${salman}`)
// console.dir(salman)
// console.log(`I am class  name: ${salman.name}`)


// salman.sleep()


let Men = [];

console.dir(Men);

let persons = new Array();
console.dir(persons);

persons.push("naimur");

console.log(persons);
console.log(Array);
console.log(Array.prototype);
