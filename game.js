"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var cardsFunction_1 = require("./cardsFunction");
var linkedArray_1 = require("./structs/linkedArray");
var stack_1 = require("./structs/stack");
var deck = new linkedArray_1.LinkedList();
deck.fillDeck();
var pit = new stack_1.Stack();
pit.push(deck.removeHead());
var player1 = { name: 'Alexandre', cards: [] };
var player2 = { name: 'Lukas', cards: [] };
var player3 = { name: 'Matsuel', cards: [] };
var players = [player1, player2, player3];
for (var i = 0; i < 7; i++) {
    (0, cardsFunction_1.drawCard)(player1, deck);
    (0, cardsFunction_1.drawCard)(player2, deck);
    (0, cardsFunction_1.drawCard)(player3, deck);
}
console.log('Checks if pit has a card');
console.log(pit.peek());
console.log('\nChecks if player1 has 7 cards');
console.log(player1);
console.log('\nChecks if player2 has 7 cards');
console.log(player2);
function playerTurn(player) {
    for (var i = 0; i < player.cards.length; i++) {
        if ((0, cardsFunction_1.isCardPlayable)(player.cards[i], pit.peek())) {
            console.log("\n".concat(player.name, " played: ").concat(player.cards[i].color, " ").concat(player.cards[i].number, " ").concat(player.cards[i].special));
            (0, cardsFunction_1.playCard)(player, pit, i);
            if ((0, cardsFunction_1.isWinner)(player)) {
                console.log("\n".concat(player.name, " has won !"));
                game = false;
            }
            break;
        }
        (0, cardsFunction_1.drawCard)(player, deck);
        console.log("\n".concat(player.name, " drew a card."));
    }
}
var game = true;
while (game) {
    players.forEach(function (player) {
        playerTurn(player);
    });
}
