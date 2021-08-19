"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function average(array) {
    return array.reduce(function (acc, curr) { return acc + curr; }, 0) / array.length;
}
exports.default = average;
