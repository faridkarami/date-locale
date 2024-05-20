"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils = {
    div(a, b) {
        return Math.floor(a / b);
    },
    remainder(a, b) {
        return a - this.div(a, b) * b;
    },
    fixer(digit) {
        return `0${digit}`.slice(-2);
    },
};
exports.default = utils;
