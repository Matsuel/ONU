import { LinkedList } from "../structs/linkedArray";

describe('LinkedList', () => {
    let list: LinkedList<number>;

    beforeEach(() => {
        list = new LinkedList<number>();
    });

    test('should append elements to the list', () => {
        list.append(1);
        list.append(2);
        list.append(3);
        expect(list.getSize()).toBe(3);
        expect(list.traverse()).toEqual([1, 2, 3]);
    });

    test('should return the head of the list', () => {
        list.append(1);
        list.append(2);
        expect(list.getHead()).toBe(1);
    });

    test('should throw an error when getting the head of an empty list', () => {
        expect(() => list.getHead()).toThrow('LinkedList has no head.');
    });

    test('should return the correct size of the list', () => {
        expect(list.getSize()).toBe(0);
        list.append(1);
        list.append(2);
        expect(list.getSize()).toBe(2);
    });

    test('should traverse the list', () => {
        list.append(1);
        list.append(2);
        list.append(3);
        expect(list.traverse()).toEqual([1, 2, 3]);
    });

    test('should return an empty array when traversing an empty list', () => {
        expect(list.traverse()).toEqual([]);
    });

    test('should remove the first element of the list', () => {
        list.append(1);
        list.append(2);
        list.append(3);
        const node = list.removeHead();
        expect(list.getSize()).toBe(2);
        expect(node).toBe(1);
        expect(list.traverse()).toEqual([2, 3]);
    });

    test('should throw an error when removing the head of an empty list', () => {
        expect(() => list.removeHead()).toThrow('LinkedList is empty.');
    });
});