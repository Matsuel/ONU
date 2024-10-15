import { Queue } from "../structs/queue";

describe('Queue', () => {
    let queue: Queue<number>;

    beforeEach(() => {
        queue = new Queue<number>();
    });

    test('should peek the last item', () => {
        queue.enqueue(1);
        queue.enqueue(2);
        queue.enqueue(3);
        expect(queue.peekLast()).toEqual(3);
    });

    test('should peek the first item', () => {
        queue.enqueue(1);
        queue.enqueue(2);
        queue.enqueue(3);
        expect(queue.peek()).toEqual(1);
    });

    test('should throw an error if len is 0 (peek & peekLast)', () => {
        expect(() => queue.peek()).toThrow('Queue is empty.');
        expect(() => queue.peekLast()).toThrow('Queue is empty.');
    });

    test('should enqueue and dequeue items', () => {
        queue.enqueue(1);
        expect(queue.dequeue()).toEqual(1);
    });

    test('should dequeue first item and enqueue last item', () => {
        queue.enqueue(2);
        queue.enqueue(3);

        expect(queue.peekLast()).toEqual(3);
        expect(queue.dequeue()).toEqual(2);
    });

    test('should return size', () => {
        expect(queue.getSize()).toEqual(0);

        queue.enqueue(2);
        queue.enqueue(3);

        expect(queue.getSize()).toEqual(2);
    });

    test('should check if isEmpty', () => {
        expect(queue.isEmpty()).toEqual(true);

        queue.enqueue(2);
        queue.enqueue(3);

        expect(queue.isEmpty()).toEqual(false);
    });

    test('should shuffle the queue', () => {
        queue.enqueue(2);
        queue.enqueue(3);
        queue.enqueue(4);
        queue.enqueue(5);
        queue.enqueue(6);
        queue.enqueue(1);

        const currentQueue = [...queue['data']];

        queue.shuffle();

        expect(queue['data']).not.toEqual(currentQueue);
        expect(queue.getSize()).toEqual(6);
    });

    test('deck should contain 108 cards', () => {
        queue.fillDeck();
        expect(queue.getSize()).toEqual(108);
    });
});