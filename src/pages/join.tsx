import React, { useEffect, useState } from "react";
import { socket } from "./_app";
import { useRouter } from "next/router";
import { emitJoinGame, onJoinGame, onStartGame } from "@/utils/socketEvents";

export default function Join() {

    const [uuid, setUuid] = useState('');
    const [username, setUsername] = useState('');
    const [message, setMessage] = useState('');
    const router = useRouter();

    useEffect(() => {
        onJoinGame((msg) => {
            if (msg.status) {
                setMessage(msg.uuid);
                setUuid(msg.uuid);
            } else {
                setMessage(msg.message);
            }
        })

        onStartGame((msg) => {
            if (msg.status) {
                router.push({ pathname: `/game/${uuid}` });
            } else {
                console.log('Game not found');
            }
        })
    }, []);

    return (
        <div>
            <h1>Join</h1>
            <input type="text" placeholder="Nom d'utilisateur" onChange={(e) => setUsername(e.target.value)} />
            <input type="text" placeholder="Game uuid" onChange={(e) => setUuid(e.target.value)} />
            <button onClick={() => emitJoinGame(uuid, username)}>Join</button>
            <p>uuid: {message}</p>
        </div>
    )
}