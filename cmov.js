"use strict"

function inner(x, y, z, w) {
    if (x) y = z;
    if (!z) x = w;
    return x + y;
}

function loop(x, y, z, w) {
    var sum = 0;
    for (var i = 0; i < 10000; i++) {
        sum = inner(x, y, z, w);
    }
    return sum;
}

function test() {
    var sum = 0;
    var x = 0, y = 0, z = 0, w = 0;

    for (var i = 0; i < 10000; i++) {
        sum += loop(x, y, z, w);
        x += 10;
        y += 20;
        z += 30;
        w += 40;
    }

    return sum;
}

console.log("warm 1"); test();
console.log("warm 2"); test();
%OptimizeFunctionOnNextCall(test);
console.log("opt 1"); test();
console.log("opt 2"); test();
