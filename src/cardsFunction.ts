import Cards from "@/interface/cards";
import { LinkedList } from "@/structs/linkedArray";
import Player from "@/interface/player";
import { Dispatch, MutableRefObject, SetStateAction } from "react";
import { Stack } from "@/structs/stack";
import { socket } from "@/pages/_app";

function isCardPlayable(card1: Cards, card2: Cards): boolean {
    const isJoker = card1.special === "changecolor" || card1.special === "plus4";

    const isSameColor =
        card1.color !== undefined &&
        card2.color !== undefined &&
        card1.color === card2.color;
    const isSameNumber =
        card1.number !== undefined &&
        card2.number !== undefined &&
        card1.number === card2.number;
    const isSameSpecial =
        card1.special !== undefined &&
        card2.special !== undefined &&
        card1.special === card2.special;

    return isJoker || isSameColor || isSameNumber || isSameSpecial;
}

const drawCard = (
    deck: LinkedList<Cards> | null,
    pit: Stack<Cards> | null,
    players: Player[],
    playerTurn: number,
    nmbCardsToDraw: number,
    uuid: string
) => {

    if (!deck) {
        console.error("Deck is null");
        return;
    }

    if (!pit) {
        console.error("Pit is null");
        return;
    }

    if (deck.getSize() === 0 || deck.getSize() < nmbCardsToDraw) {
        console.error("Deck is empty, can’t draw a card from it.");
        return;
    }

    socket.emit("drawCard", { deck, pit, players, playerTurn, uuid });
};


const getPitsCardsToDeck = (
    pit: Stack<Cards> | null,
    setPit: Dispatch<SetStateAction<Stack<Cards> | null>>,
    setDeck: Dispatch<SetStateAction<LinkedList<Cards> | null>>
) => {

    if (!pit) {
        console.error("Pit is null");
        return;
    }

    if (!setPit) {
        console.error("Pit is null");
        return;
    }

    if (pit.getSize() === 1) {
        console.error("Can't get cards from pit of len 1");
        return;
    }

    const updatedDeck = new LinkedList<Cards>();

    while (pit.getSize() > 1) {
        const removedCard = pit.shift();
        updatedDeck.append(removedCard);
    }

    setPit(new Stack<Cards>([updatedDeck.removeHead()]));
    setDeck(updatedDeck);

    socket.emit("getPitsCardsToDeck", { pit, deck: updatedDeck });
};

const displayColorsChoice = (
    colorChangeRef: MutableRefObject<HTMLElement | null>
) => {
    if (colorChangeRef.current === null) {
        console.error("colorChangeRef is null");
        return;
    }

    colorChangeRef.current.classList.toggle("hidden");
    colorChangeRef.current.classList.toggle("flex");
};

const changeColor = (
    newColor: "r" | "y" | "b" | "g",
    pit: Stack<Cards> | null,
    setPit: Dispatch<SetStateAction<Stack<Cards> | null>>,
    colorChangeRef: MutableRefObject<HTMLElement | null>
) => {

    if (!pit) {
        console.error("Pit is null");
        return;
    }

    const updatedCard = pit.peek();
    pit.shift();

    const newCard: Cards = {
        special: updatedCard.special,
        color: newColor,
        changecolor: true,
    };
    const updatedPit = new Stack<Cards>([...pit.getItems(), newCard]);

    setPit(updatedPit);
    displayColorsChoice(colorChangeRef);
};

export {
    isCardPlayable,
    drawCard,
    getPitsCardsToDeck,
    changeColor,
};
