import { LinkedList } from "@/structs/linkedArray";
import { Dispatch, SetStateAction } from "react";
import { Stack } from "@/structs/stack";
import { socket } from "@/pages/_app";
import { Cards, Player } from "../types";

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

export const playCardOnClick = (cardIndex: number, card: Cards, player: Player, uuid: string, specialColor?: string) =>
    socket.emit("playCard", {
        uuid,
        cardIndex,
        card,
        player,
        specialColor
    });

export {
    isCardPlayable,
    drawCard,
    getPitsCardsToDeck,
};
