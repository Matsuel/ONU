import React from "react";
import { LinkedList } from "../../../structs/linkedArray";
import { Stack } from "../../../structs/stack";
import Cards from "../../../interface/cards";
import Player from "../../../interface/player";
import { useEffect, useState, useRef } from "react";
import Deck from "@/components/Deck";
import Players from "@/components/Player";
import Pit from "@/components/Pit";
import { changeColor } from "../../../cardsFunction";
import { socket } from "../_app";
import { useRouter } from "next/router";

export default function Game() {
  const router = useRouter();
  const { id } = router.query;

  const [players, setPlayers] = useState<Player[]>([]);
  const [deck, setDeck] = useState<LinkedList<Cards> | null>(null);
  const [pit, setPit] = useState<Stack<Cards> | null>(null);

  const [playerTurn, setPlayerTurn] = useState(0);
  const [isTurnDirectionClockwise, setIsTurnDirectionClockwise] = useState(true);
  const [nmbCardsToDraw, setNmbCardsToDraw] = useState(0);
  const colors = ["red", "yellow", "blue", "green"];
  const colorChangeRef = useRef(null);
  const [uuid, setUuid] = useState("");

  // TODO:
  // - +2 problème qui empêche de jouer une carte normale après
  // - +4 et Changement de couleur
  // - Faire un event pour le changement de couelur et le +4
  // - Modal pour choisir la couleur
  // - Ajouter toutes les props de base dans la partie lors de sa création isTurnDirectionClockwise, nmbCardsToDraw

  useEffect(() => {
    const playerUuid = sessionStorage.getItem("uuid");
    if (playerUuid) {
      setUuid(playerUuid);
    } else {
      router.push("/");
    }
  }, []);

  useEffect(() => {
    if (id) socket.emit("getGame", { id: id[0], uuid });
  }, [uuid, id]);

  useEffect(() => {
    socket.on("getGame", (data) => {
      console.log(data);
      console.log(data.game.playerTurn)
      setPlayerTurn(data.game.playerTurn);
      const newDeck = new LinkedList<Cards>();
      newDeck.fromJSON(data.game.deck);
      setPit(new Stack(data.game.pit.stack));
      setDeck(newDeck);
      setPlayers(data.game.players as Player[]);
    });
  }, []);

  if (!id) return <div>Loading...</div>;

  return (
    <div className="flex flex-col bg-black w-screen min-h-screen text-white">
      <Players
        uuid={id[0] as string}
        players={players}
        playerTurn={playerTurn}
        pit={pit}
        deck={deck}
        isTurnDirectionClockwise={isTurnDirectionClockwise}
        nmbCardsToDraw={nmbCardsToDraw}
      />

      <Deck
        uuid={id[0] as string}
        deck={deck}
        playerTurn={playerTurn}
        players={players}
        pit={pit}
        setPit={setPit}
        setDeck={setDeck}
        nmbCardsToDraw={nmbCardsToDraw}
      />

      <Pit pit={pit} />

      <div className="hidden" ref={colorChangeRef}>
        {Array.from({ length: 4 }).map((_, index) => (
          <button
            className="w-32 h-32 hover:border-4 border-white transition-all rounded-2xl"
            style={{ background: colors[index] }}
            key={index}
            onClick={() => {
              index === 0
                ? changeColor("r", pit, setPit, colorChangeRef)
                : index === 1
                  ? changeColor("y", pit, setPit, colorChangeRef)
                  : index === 2
                    ? changeColor("b", pit, setPit, colorChangeRef)
                    : index === 3
                      ? changeColor("g", pit, setPit, colorChangeRef)
                      : "";
            }}
          ></button>
        ))}
      </div>
    </div>
  );
}
