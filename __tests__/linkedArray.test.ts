import { LinkedList } from "../structs/linkedArray";

describe('LinkedList', () => {
    let list: LinkedList<number>;

    beforeEach(() => {
        list = new LinkedList<number>();
    });

    test('should push element to the beginning of the list', () => {
        list.push(3);
        expect(list.getSize()).toBe(1);
        expect(list.traverse()).toEqual([3]);
        list.push(2);
        list.push(1);
        expect(list.getSize()).toBe(3);
        expect(list.traverse()).toEqual([1, 2, 3]);
    });

    test('should return the head of the list', () => {
        list.push(1);
        list.push(2);
        expect(list.getHead()).toBe(2);
    });

    test('should throw an error when getting the head of an empty list', () => {
        expect(() => list.getHead()).toThrow('LinkedList has no head.');
    });

    test('should return the correct size of the list', () => {
        expect(list.getSize()).toBe(0);
        list.push(1);
        list.push(2);
        expect(list.getSize()).toBe(2);
    });

    test('should traverse the list', () => {
        list.push(3);
        list.push(2);
        list.push(1);
        expect(list.traverse()).toEqual([1, 2, 3]);
    });

    test('should return an empty array when traversing an empty list', () => {
        expect(list.traverse()).toEqual([]);
    });

    test('should remove the first element of the list', () => {
        list.push(3);
        list.push(2);
        list.push(1);
        const node = list.removeHead();
        expect(list.getSize()).toBe(2);
        expect(node).toBe(1);
        expect(list.traverse()).toEqual([2, 3]);
    });

    test('should remove the tail from the list', () => {
        list.push(3);
        list.push(2);
        list.push(1);
        list.removeTail();
        expect(list.getSize()).toBe(2);
        expect(list.traverse()).toEqual([2, 3]);
    })

    test('should throw an error when removing the tail of an empty list', () => {
        expect(() => list.removeTail()).toThrow('LinkedList is empty.');
    })

    test('should throw an error when removing the head of an empty list', () => {
        expect(() => list.removeHead()).toThrow('LinkedList is empty.');
    });
});
