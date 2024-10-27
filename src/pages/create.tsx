import React, { useEffect, useState } from "react";
import { socket } from "./_app";
import { useRouter } from "next/router";

export default function Create() {

    const [uuid, setUuid] = useState('');
    const [username, setUsername] = useState('');
    const router = useRouter();

    const copyToClipboard = () => {
        navigator.clipboard.writeText(uuid);
    }

    const startGame = () => {
        socket.emit('start', { uuid: uuid });
        // Recuperer la réponse du serveur et rediriger vers la page de jeu /game?uuid=uuid
        // router.push({pathname: '/game', query: {uuid: uuid}})
    }

    useEffect(() => {
        socket.on('create', (msg) => {
            console.log('message: ' + msg);
            setUuid(msg.uuid);
        })

        socket.on('start', (msg) => {
            console.log('message kk: ' + msg);
            if (msg.status) {
                router.push({ pathname: '/game' });
            } else {
                console.log('Game not found');
            }
        })
    }, []);


    return (
        <div className="flex flex-col justify-start items-start">
            <h1>Création de partie</h1>
            {uuid === '' ?
                <div>
                    <input type="text" placeholder="Nom d'utilisateur" onChange={(e) => setUsername(e.target.value)} />
                    <button onClick={() => socket.emit('create', { username: username })}>Créer la partie</button>
                </div>
                :
                <div>
                    <p>uuid: {uuid}</p>
                    <button onClick={copyToClipboard}>Copier le code de la partie</button>
                    <button onClick={startGame}>
                        Commencer la partie
                    </button>
                </div>
            }
            {/* <p>uuid: {uuid}</p>
            <button onClick={copyToClipboard}>Copier le code de la partie</button>
            <button onClick={startGame}>
                Commencer la partie
            </button> */}
        </div>
    )
}