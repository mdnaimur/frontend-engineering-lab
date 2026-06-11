/// higher order fuction


// function hello() {
//     console.log(`Hello word`);
// }

// hello();

// hello.language = ' Java';

// console.log(hello.language);


// var a = function hello() {
//     console.log(`Hello word`);
// }

// console.dir(a);

// var str = 'hello';
// console.dir(str);



// function hello() {
//     return function () {

//         console.log(`Hello word`);
//     }
// }


// hello()();


// exmple 1 without higher order function

// var numbers = [1, 2, 3, 4];

// var result = [];

// for (let i = 0; i < numbers.length; i++) {
//     result.push(numbers[i] * 2);
// }

// console.log(result);


// exmple 1 with higher order function


// var numbers = [1, 2, 3, 4];

// var result = numbers.map((num) => {
//     return num * 2;

// })

// console.log(result);


// exmple 2 without higher order fuction


// var player = [
//     {
//         name: "Khan",
//         age: 39.45
//     },
//     {
//         name: "Akhash",
//         age: 37.33
//     },
//     {
//         name: "Siam",
//         age: 32
//     },
//     {
//         name: "Shahadat",
//         age: 36.55
//     },
//     {
//         name: "Joy",
//         age: 35.69
//     },
//     {
//         name: "Rabbi",
//         age: 35.8
//     },
// ]



// var playersWithAvg37 = [];

// for (let i = 0; i < player.length; i++) {

//     if (player[i].age >= 36) {
//         playersWithAvg37.push(player[i]);
//     }

// }

// console.log(playersWithAvg37);

// var playersWithAvg37 = player.filter((p) => {

//     return p.age >= 36;

// });

// console.log(playersWithAvg37);


const languages = ['JavaScript', "Python", "PHP", "C"];


function myMapNaimur(arr, fn) {

    const newArray = [];
    for (let i = 0; i < arr.length; i++) {
        newArray.push(fn(arr[i]));
    }
    return newArray;
}

const myArr = myMapNaimur(languages, function (lang) {
    return lang.length;
});

console.log(myArr);