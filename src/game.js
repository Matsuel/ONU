"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var linkedArray_1 = require("./structs/linkedArray");
var queue_1 = require("./structs/queue");
var deck = new queue_1.Queue();
deck.fillDeck();
deck.shuffle();
var player1 = new linkedArray_1.LinkedList();
var pit = new queue_1.Queue();
for (var i = 0; i < 7; i++) {
    player1.append(deck.dequeue());
}
console.log(player1.traverse());
var cardPlayed = player1.removeNode(0);
pit.enqueue(cardPlayed);
pit.log();
console.log(player1.traverse());
