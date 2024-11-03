import React, { useEffect, useState } from "react";
import { socket } from "./_app";
import { useRouter } from "next/router";
import { emitCreateGame, emitStartGame, onCreateGame, onStartGame } from "@/utils/socketEvents";

export default function Create() {

    const [uuid, setUuid] = useState('');
    const [username, setUsername] = useState('');
    const router = useRouter();

    const copyToClipboard = () => {
        navigator.clipboard.writeText(uuid);
    }

    useEffect(() => {
        onCreateGame((msg) => {
            setUuid(msg.uuid);
        })

        onStartGame((msg) => {
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
                    <button onClick={() => emitCreateGame(username)}>
                        Créer la partie
                    </button>
                </div>
                :
                <div>
                    <p>uuid: {uuid}</p>
                    <button onClick={copyToClipboard}>Copier le code de la partie</button>
                    <button onClick={() => emitStartGame(uuid)}>
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