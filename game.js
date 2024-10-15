"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var playCard_1 = require("./playCard");
var linkedArray_1 = require("./structs/linkedArray");
var queue_1 = require("./structs/queue");
var deck = new queue_1.Queue();
deck.fillDeck();
deck.shuffle();
var player1 = new linkedArray_1.LinkedList('player1');
var pit = new queue_1.Queue();
pit.enqueue(deck.dequeue());
for (var i = 0; i < 7; i++) {
    // player1.append(deck.dequeue());
}
// console.log(player1.getNode(0));
// console.log(pit.peekLast());
// playCard(player1, pit, 0);
// console.log(pit.peekLast());
console.log(player1.traverse());
console.log(deck.getSize());
(0, playCard_1.drawCard)(player1, deck);
console.log(deck.getSize());
console.log(player1.traverse());
