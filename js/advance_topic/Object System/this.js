// var printPlayerName = function (name) {
//     console.log(name);
// }

// printPlayerName('Naimur');

// var naimur = {
//     name: "naimur",
//     age: 30,
//     printPlayerName: function () {
//         console.log(this.name);
//     }
// }

// naimur.printPlayerName();


// var printPlayerNameFuction = function (obj) {
//     obj.printPlayerName = function () {
//         console.log(this.name);
//     };
// };


// var naimur = {
//     name: "naimur",
//     age: 30
// }

// printPlayerNameFuction(naimur);

// // console.log(naimur.printPlayerName);
// naimur.printPlayerName();



/***
 * 
 * 
 * Explicit Binding 
 */


var printName = function () {
    console.log(this.name)
}

var naimur = {
    name: "naimur",
    age: 30
}

printName.call(naimur);