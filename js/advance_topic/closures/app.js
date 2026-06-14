// let name = 'John';

// function greeting() {
//     let message = 'Hi';
//     console.log(`i am outer ${message}`);

//     function sayHi() {

//         console.log(message + ' ' + name);
//     }

//     sayHi();
// }

// greeting();



// function greeting() {
//     let message = 'Hi';
//     console.log(`i am outer ${message}`);

//     function sayHi() {

//         console.log(message + ' ' + name);
//     }

//     return sayHi;
// }

// let hi = greeting();
// hi();
// console.dir(hi);

// function greeting(messgae) {
//     return function (name) {
//         return messgae + ' ' + name;

//     }
// }

// let sayHi = greeting('hi');
// console.log(sayHi);
// console.dir(sayHi);

// console.log(sayHi('naimur'))

// for (var index = 1; index <= 3; index++) {
//     setTimeout(function () {
//         console.log('after ' + index + ' Second(s) ' + index + '\n');
//     }, index * 1000);
// }



// for (var index = 1; index <= 3; index++) {
//     (function (index) {
//         setTimeout(function () {
//             console.log('after ' + index + ' second(s):' + index);
//         }, index * 1000);
//     })(index);
// }




/************************** */



// lexcial scope 
// var sum = function (num1, num2) {
//     return num1 + num2;
// }

// console.log(sum(5, 3));

// console.dir(sum);

// var sum = function () {
//     var num2 = 4;

//     return function () {
//         var num1 = 2;

//         return num1 + num2;
//     }
// }



// console.dir(sum);

// var myFunc = sum();

// console.dir(myFunc);



// function bankAcc(initBal) {
//     var bal = initBal;
//     return function () {
//         return bal;
//     }
// }

// var acc = bankAcc(10000);

// console.log(acc());
// console.dir(acc);



// (function () {
//     var num1 = 3;
//     var num2 = 5;

//     var sum = function () {
//         return num1 + num2;
//     }

//     console.log(sum());
//     console.dir(sum);

//     num1 = 20;
//     num2 = 30;

//     console.log(sum());

//     console.dir(sum);
// }
// )();


// (function () {
//     let num1 = 3;
//     let num2 = 5;

//     var sum = function () {
//         return num1 + num2;
//     }

//     console.log(sum());
//     console.dir(sum);

//     num1 = 20;
//     num2 = 30;

//     console.log(sum());

//     console.dir(sum);

// })();


// function stopWatch() {
//     var startTime = Date.now();

//     function getDelay() {
//         console.log(Date.now() - startTime);
//     }

//     return getDelay;
// }

// var timer = stopWatch();

// // console.log(timer)

// // console.dir(timer);

// for (var i = 0; i < 100000000; i++) {
//     var a = Math.random() * 1000000;
// }


// timer();
// timer();
// timer();
// timer();
// console.dir(timer);

// function async() {
//     var a = 20;
//     setTimeout(() => {
//         console.log(a);
//     }, 3000)
// }

// async();

// function makeCounter() {
//     let count = 0;

//     return function () {
//         count++;
//         return count;
//     };
// }

// const counter = makeCounter();
// console.log(counter());
// console.log(counter());
// console.log(counter());


// const BankAccount = (initialBalance) => {
//     let balance = initialBalance; // private — never directly accessible

//     return {
//         deposit: (amount) => { balance += amount; },
//         withdraw: (amount) => {
//             if (amount > balance) throw new Error("Insufficient funds");
//             balance -= amount;
//         },
//         getBalance: () => balance,
//     };
// };

// const acct = BankAccount(1000);
// acct.deposit(500);
// acct.getBalance(); // 1500
// console.log(acct.getBalance());


// function init() {
//     var name = "Mozilla"; // name is a local variable created by init
//     function displayName() {
//         // displayName() is the inner function, that forms a closure
//         console.log(name); // use variable declared in the parent function
//     }
//     displayName();
// }
// init();

// console.dir(init)


// if (Math.random() > 0.5) {
//     var x = 1;
// } else {
//     var x = 2;
// }
// console.log(x);

// if (Math.random() > 0.5) {
//     const x = 1;
// } else {
//     const x = 2;
// }
// console.log(x); // ReferenceError: x is not defined


function makeFunc() {
    const name = "Mozilla";
    function displayName() {
        console.log(name);
    }
    return displayName;
}

const myFunc = makeFunc();
myFunc();

console.dir(myFunc);