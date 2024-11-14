import React, { useContext } from "react";
import { LinkedList } from "../../../structs/linkedArray";
import { Stack } from "../../../structs/stack";
import Cards from "../../../interface/cards";
import Player from "../../../interface/player";
import { useEffect, useState } from "react";
import Deck from "@/components/Deck";
import Players from "@/components/Player";
import Pit from "@/components/Pit";
import { socket } from "../_app";
import { useRouter } from "next/router";
import { drawCard } from "../../../cardsFunction";
import { GameContext } from "@/providers/GameProvider";
import { PlayersContext } from "@/providers/PlayersProvider";
import { PitContext } from "@/providers/PitProvider";
import { DeckContext } from "@/providers/DeckProvider";

export default function Game() {

    const { isTurnDirectionClockwise, setIsTurnDirectionClockwise, nmbCardsToDraw, setNmbCardsToDraw, uuid, setUuid } = useContext(GameContext)
    const { playerTurn, players, setPlayerTurn, setPlayers, setTimer, timer } = useContext(PlayersContext);
    const { pit, setPit } = useContext(PitContext);
    const { deck, setDeck } = useContext(DeckContext);

    const router = useRouter();
    const { id } = router.query;


    const [loading, setLoading] = useState(true);

    // TODO:
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
        if (id) {
            setLoading(true);
            socket.emit("getGame", { id: id[0], uuid });
        }
    }, [uuid, id]);

    useEffect(() => {
        socket.on("getGame", (data) => {
            setPlayerTurn(data.game.playerTurn);
            setTimer(30);
            const newDeck = new LinkedList<Cards>();
            newDeck.fromJSON(data.game.deck);
            setPit(new Stack(data.game.pit.stack));
            setDeck(newDeck);
            setPlayers(data.game.players as Player[]);
            setLoading(false);
        });

        socket.on("gameOver", (data) => {
            console.log(data);

            // Quand l'utilisateur clique sur OK, on le redirige vers la page d'accueil
        });
    }, [router]);

    useEffect(() => {
        if (!uuid || players.length === 0 || !id) return;
        if (players[playerTurn].uuid === uuid) {
            const interval = setInterval(() => {
                setTimer((prev) => {
                    if (prev === 0) {
                        drawCard(deck, pit, players, playerTurn, 1, id[0] as string);
                        clearInterval(interval);
                        return 30;
                    }
                    return prev - 1;
                });
            }, 1000);
            return () => clearInterval(interval);
        }

    }, [playerTurn, players, uuid, id, deck, pit]);

    if (!id || !uuid || loading) return <div>Loading...</div>;

    return (
        <div className="flex flex-col bg-black w-screen min-h-screen text-white">
            {players[playerTurn].uuid === uuid && (
                <div className="bg-white text-black">
                    <h1>{timer}</h1>
                </div>
            )}
            <Players
                uuid={id[0] as string}
                isTurnDirectionClockwise={isTurnDirectionClockwise}
                nmbCardsToDraw={nmbCardsToDraw}
            />

            <Deck
                uuid={id[0] as string}
                deck={deck}
                playerTurn={playerTurn}
                players={players}
                setDeck={setDeck}
                nmbCardsToDraw={nmbCardsToDraw}
            />

            <Pit />
        </div>
    );
}
