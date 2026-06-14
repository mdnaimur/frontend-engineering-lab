// Global Scope

var globalVar = "I'm global";
function test() { console.log(globalVar); } // accessible ✓
test();

// functional scope

function myFunc() {
    var localVar = "only here";
    console.log(localVar); // works ✓
}
myFunc();
// console.log(localVar); // ReferenceError ✗


// Block scope

if (true) {
    let blockVar = "block only";
    var funcVar = "function wide"; // var ignores blocks!
}
// console.log(blockVar); // ReferenceError ✗
console.log(funcVar);  // works! var escapes blocks 

//  The Scope Chain


var x = 1;
function outer() {
    var y = 2;
    function inner() {
        var z = 3;
        console.log(x); // 1 — found in global
        console.log(y); // 2 — found in outer
        console.log(z); // 3 — found in own scope
    }
    inner();
}
outer();

// Bug — var is function-scoped, not block-scoped
for (var i = 0; i < 3; i++) {
    setTimeout(() => console.log(i), 100);
}
// Output: 3, 3, 3 (all share the same i)

// Fix — use let (block-scoped)
for (let i = 0; i < 3; i++) {
    setTimeout(() => console.log(i), 100);
}
// Output: 0, 1, 2 ✓ each iteration gets its own i