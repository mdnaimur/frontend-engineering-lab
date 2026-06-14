
function makeCounter() {
    let count = 0;

    return {
        increment: function () { count++; },
        decrement: function () { count--; },
        value: function () { return count; },
    };
}

const counter = makeCounter();
counter.increment();
counter.increment();
counter.increment();
counter.decrement();
console.log(counter.value()); // 2


// Real-world: memoization using closures

function memoize(fn) {
    const cache = new Map(); // private — lives in memoize's LexEnv

    return function memoized(...args) {
        const key = JSON.stringify(args);

        if (cache.has(key)) {
            console.log(`[Cache HIT] ${key}`);
            return cache.get(key);
        }

        console.log(`[Cache MISS] ${key}`);
        const result = fn(...args);
        cache.set(key, result);
        return result;
    };
}

// Usage
function expensiveCalculation(n) {
    console.log(`Computing for ${n}...`);
    let result = 0;
    for (let i = 0; i <= n; i++) result += i;
    return result;
}

const memoizedCalc = memoize(expensiveCalculation);

memoizedCalc(1000); // Cache MISS — computes
memoizedCalc(1000); // Cache HIT  — returns instantly
memoizedCalc(2000); // Cache MISS — computes
memoizedCalc(2000); // Cache HIT  — returns instantly

// Each `memoize(fn)` call gets its own private `cache` Map
// The cache lives in memoize's LexEnv — persists forever
// No external code can access or corrupt the cache