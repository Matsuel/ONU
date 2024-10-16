"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Stack = void 0;
var Stack = /** @class */ (function () {
    function Stack() {
        this.stack = [];
        this.len = 0;
    }
    Stack.prototype.push = function (elem) {
        this.stack.push(elem);
        this.len++;
    };
    Stack.prototype.getSize = function () {
        return this.len;
    };
    Stack.prototype.pop = function () {
        if (this.isEmpty()) {
            throw new Error('Stack is empty.');
        }
        else {
            this.len--;
            return this.stack.shift();
        }
    };
    Stack.prototype.isEmpty = function () {
        return this.getSize() === 0;
    };
    Stack.prototype.peek = function () {
        if (this.isEmpty()) {
            throw new Error('Stack is empty.');
        }
        else {
            return this.stack[this.getSize() - 1];
        }
    };
    return Stack;
}());
exports.Stack = Stack;
