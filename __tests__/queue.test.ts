import { Queue } from "../structs/queue";
import Cards from "../interface/cards";
import exp from "constants";

describe('Queue', () => {
    let queue: Queue<Cards>;

    beforeEach(() => {
        queue = new Queue<Cards>();
    });

    test('should peek the last item', () => {
        const card: Cards = { color: 'red', number: 1 };
        const card2: Cards = { color: 'red', number: 2 };
        const card3: Cards = { color: 'red', number: 3 };

        queue.enqueue(card);
        queue.enqueue(card2);
        queue.enqueue(card3);
        expect(queue.peekLast()).toEqual(card3);
    });

    test('should peek the first item', () => {
        const card: Cards = { color: 'red', number: 1 };
        const card2: Cards = { color: 'red', number: 2 };
        const card3: Cards = { color: 'red', number: 3 };

        queue.enqueue(card);
        queue.enqueue(card2);
        queue.enqueue(card3);
        expect(queue.peek()).toEqual(card);
    });

    test('should throw an error if len is 0 (peek & peekLast)', () => {
        expect(() => queue.peek()).toThrow('Queue is empty.');
        expect(() => queue.peekLast()).toThrow('Queue is empty.');
    });

    test('should enqueue and dequeue items', () => {
        const card: Cards = { color: 'red', number: 1 };
        queue.enqueue(card);
        expect(queue.dequeue()).toEqual(card);
    });

    test('should dequeue first item and enqueue last item', () => {
        const card: Cards = { color: 'red', number: 2 };
        const card2: Cards = { color: 'green', number: 2 };

        queue.enqueue(card);
        queue.enqueue(card2);

        expect(queue.peekLast()).toEqual(card2);
        expect(queue.dequeue()).toEqual(card);
    })

    test('should return size', () => {
        const card: Cards = { color: 'red', number: 2 };
        const card2: Cards = { color: 'green', number: 2 };

        expect(queue.getSize()).toEqual(0);

        queue.enqueue(card);
        queue.enqueue(card2);

        expect(queue.getSize()).toEqual(2);
    })

    test('should check if isEmpty', () => {
        const card: Cards = { color: 'red', number: 2 };
        const card2: Cards = { color: 'green', number: 2 };

        expect(queue.isEmpty()).toEqual(true);

        queue.enqueue(card);
        queue.enqueue(card2);

        expect(queue.isEmpty()).toEqual(false);
    })

    test('should shuffle the queue', () => {
        const card: Cards = { color: 'red', number: 2 };
        const card2: Cards = { color: 'green', number: 2 };
        const card3: Cards = { color: 'red', number: 3 };
        const card4: Cards = { color: 'yellow', number: 3 };
        const card5: Cards = { color: 'red', number: 5 };
        const card6: Cards = { color: 'red', number: 1 };

        queue.enqueue(card);
        queue.enqueue(card2);
        queue.enqueue(card3);
        queue.enqueue(card4);
        queue.enqueue(card5);
        queue.enqueue(card6);

        const currentQueue = [...queue['data']];

        queue.shuffle();

        expect(queue['data']).not.toEqual(currentQueue);
        expect(queue.getSize()).toEqual(6);
    })

    test('deck should contain 108 cards', () => {
        queue.fillDeck();
        expect(queue.getSize()).toEqual(108);
    })
});