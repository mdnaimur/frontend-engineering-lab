console.log(x); // undefined (not an error!)
var x = 5;
console.log(x); // 5

var x;          // creation phase — hoisted
console.log(x); // undefined
x = 5;          // execution phase
console.log(x); // 5