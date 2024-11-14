import DeckProvider from "@/providers/DeckProvider";
import GameProvider from "@/providers/GameProvider";
import PitProvider from "@/providers/PitProvider";
import PlayersProvider from "@/providers/PlayersProvider";
import "@/styles/globals.css";
import { AppProps } from "next/app";
import io from "socket.io-client";

export default function App({
    Component,
    pageProps
}: AppProps) {
    return (
        <PlayersProvider>
            <GameProvider>
                <PitProvider>
                    <DeckProvider>
                        <Component {...pageProps} />
                    </DeckProvider>
                </PitProvider>
            </GameProvider>
        </PlayersProvider>
    );
}

export const socket = io("http://localhost:8000");