import { LinkedList } from "../structs/linkedArray";

describe('LinkedList', () => {
    let list: LinkedList<number>;

    beforeEach(() => {
        list = new LinkedList<number>('TestList');
    });

    test('should append elements to the list', () => {
        list.append(1);
        list.append(2);
        list.append(3);
        expect(list.getSize()).toBe(3);
        expect(list.traverse()).toEqual([1, 2, 3]);
    });

    test('should remove node at specified index', () => {
        list.append(1);
        list.append(2);
        list.append(3);
        expect(list.removeNode(1)).toBe(2);
        expect(list.getSize()).toBe(2);
        expect(list.traverse()).toEqual([1, 3]);
    });

    test('should throw an error when removing node at invalid index', () => {
        list.append(1);
        expect(() => list.removeNode(1)).toThrow('LinkedList out of bounds.');
    });

    test('should get the head of the list', () => {
        list.append(1);
        list.append(2);
        expect(list.getHead().getElement()).toBe(1);
    });

    test('should throw an error when getting the head of an empty list', () => {
        expect(() => list.getHead()).toThrow('LinkedList has no head.');
    });

    test('should get node at specified index', () => {
        list.append(1);
        list.append(2);
        list.append(3);
        expect(list.getNode(1).getElement()).toBe(2);
    });

    test('should throw an error when getting node at invalid index', () => {
        list.append(1);
        expect(() => list.getNode(1)).toThrow('LinkedList out of bounds.');
    });

    test('should return the correct size of the list', () => {
        expect(list.getSize()).toBe(0);
        list.append(1);
        list.append(2);
        expect(list.getSize()).toBe(2);
    });

    test('should check if the list is empty', () => {
        expect(list.checkWin()).toBe(true);
        list.append(1);
        expect(list.checkWin()).toBe(false);
    });

    test('should traverse the list and return elements as an array', () => {
        list.append(1);
        list.append(2);
        list.append(3);
        expect(list.traverse()).toEqual([1, 2, 3]);
    });
});