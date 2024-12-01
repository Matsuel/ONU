import { isCardPlayable } from "@/utils/cardsFunction";
import Cards from "@/interface/cards";

describe('Actions', () => {
    test('isCardPlayable: should return true or false depending on cards', () => {
        let card1: Cards = { number: 3, color: 'g' };
        let card2: Cards = { number: 4, color: 'g' };

        expect(isCardPlayable(card1, card2)).toBe(true);

        card1 = { number: 4, color: 'g' };
        card2 = { number: 4, color: 'r' };

        expect(isCardPlayable(card1, card2)).toBe(true);

        card1 = { number: 5, color: 'g' };
        card2 = { number: 4, color: 'r' };

        expect(isCardPlayable(card1, card2)).toBe(false);

        card1 = { special: 'plus4' };
        card2 = { number: 4, color: 'r' };

        expect(isCardPlayable(card1, card2)).toBe(true);

        card1 = { special: 'plus2', color: 'r' };
        card2 = { number: 4, color: 'r' };

        expect(isCardPlayable(card1, card2)).toBe(true);


        card1 = { special: 'plus2', color: 'g' };
        card2 = { number: 4, color: 'r' };

        expect(isCardPlayable(card1, card2)).toBe(false);
    })
})
