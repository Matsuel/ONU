import { drawCard, isCardPlayable, playCard } from "../cardsFunction";
import Cards from "../interface/cards";
import Player from "../interface/player";
import { LinkedList } from "../structs/linkedArray";
import { Stack } from "../structs/stack";

describe('Actions', () => {
    const deck = new LinkedList<Cards>();
    const pit = new Stack<Cards>();
    const player: Player = { name: 'Alexandre', cards: [] };

    test('drawCard: should return an error if deck is empty', () => {
        expect(() => drawCard(player, deck)).toThrow('Cant draw a card from an empty deck.');
    })

    test('drawCard: should draw a card from deck to player hand', () => {
        const card: Cards = { number: 3, color: 'green' };

        deck.append(card)

        expect(drawCard(player, deck)).toBe(true);
        expect(player.cards[0]).toBe(card);
        expect(deck.getSize()).toBe(0);
    });

    test('isCardPlayable: should return true or false depending on cards', () => {
        let card1: Cards = { number: 3, color: 'green'};
        let card2: Cards = { number: 4, color: 'green'};

        expect(isCardPlayable(card1, card2)).toBe(true);

        card1 = { number: 4, color: 'green' };
        card2 = { number: 4, color: 'red' };

        expect(isCardPlayable(card1, card2)).toBe(true);

        card1 = { number: 5, color: 'green' };
        card2 = { number: 4, color: 'red' };

        expect(isCardPlayable(card1, card2)).toBe(false);

        card1 = { special: 'drawFour' };
        card2 = { number: 4, color: 'red' };

        expect(isCardPlayable(card1, card2)).toBe(true);

        card1 = { special: 'drawTwo', color: 'red' };
        card2 = { number: 4, color: 'red' };

        expect(isCardPlayable(card1, card2)).toBe(true);


        card1 = { special: 'drawTwo', color: 'green' };
        card2 = { number: 4, color: 'red' };

        expect(isCardPlayable(card1, card2)).toBe(false);
    })

    test('playCard: should play card if possible', () => {
        let card1: Cards = { number: 3, color: 'green'};
        let card2: Cards = { number: 3, color: 'green'};
        let card3: Cards = { number: 5, color: 'red'};

        pit.push(card1);
        player.cards.push(card2);

        expect(playCard(player, pit, 0)).toBe(true);

        expect(player.cards.length).toBe(0);
        expect(pit.getSize()).toBe(2);
        expect(pit.peek()).toEqual(card2)

        expect(() => playCard(player, pit, 0)).toThrow('Invalid card index');

        player.cards.push(card3);

        expect(playCard(player, pit, 0)).toBe(false);
    });
})