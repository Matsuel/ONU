"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var linkedArray_1 = require("./structs/linkedArray");
var stack_1 = require("./structs/stack");
var deck = new linkedArray_1.LinkedList();
var pit = new stack_1.Stack(deck);
var player1 = [];
for (var i = 0; i < 7; i++) {
    player1.push(deck.removeHead());
}
console.log(pit.peek());
