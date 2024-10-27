import React, { useEffect, useState } from "react";
import { socket } from "./_app";
import { useRouter } from "next/router";

export default function Join() {

    const [uuid, setUuid] = useState('');
    const [username, setUsername] = useState('');
    const [message, setMessage] = useState('');
    const router = useRouter();

    const joinGame = () => {
        socket.emit('join', { uuid: uuid, username: username });
    }

    useEffect(() => {
        socket.on('join', async (msg) => {
            console.log('message: ' + msg);
            if (msg.status) {
                setMessage(msg.uuid);
                setUuid(msg.uuid);
            } else {
                setMessage(msg.message);
            }
        })

        socket.on('start', (msg) => {
            console.log('message kk: ' + msg);
            if (msg.status) {
                router.push({ pathname: '/game'});
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
            <button onClick={joinGame}>Join</button>
            <p>uuid: {message}</p>
        </div>
    )
}