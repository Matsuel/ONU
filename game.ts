import { drawCard, isCardPlayable, isWinner, playCard } from "./cardsFunction";
import Cards from "./interface/cards";
import Player from "./interface/player";
import { LinkedList } from "./structs/linkedArray";
import { Stack } from "./structs/stack";

const deck = new LinkedList<Cards>();
deck.fillDeck();

const pit = new Stack<Cards>();
pit.push(deck.removeHead());

const player1: Player = { name: 'Alexandre', cards: [] };
const player2: Player = { name: 'Lukas', cards: [] };
const player3: Player = { name: 'Matsuel', cards: [] };

const players = [player1, player2, player3]

for (let i = 0; i < 7; i++) {
    drawCard(player1, deck);
    drawCard(player2, deck);
    drawCard(player3, deck)
}

console.log('Checks if pit has a card')
console.log(pit.peek());

console.log('\nChecks if player1 has 7 cards');
console.log(player1);

console.log('\nChecks if player2 has 7 cards');
console.log(player2);

function playerTurn(player: Player) {
    for (let i = 0; i < player.cards.length; i++) {
        if (isCardPlayable(player.cards[i], pit.peek())) {
            console.log(`\n${player.name} played: ${player.cards[i].color} ${player.cards[i].number} ${player.cards[i].special}`);

            playCard(player, pit, i);

            if (isWinner(player)) {
                console.log(`\n${player.name} has won !`);
                game = false;
            } 

            break;
        }

        drawCard(player, deck);
        console.log(`\n${player.name} drew a card.`)
    }
}

let game = true;

while (game) {
    players.forEach(player => {
        playerTurn(player);
    });
}