import DeckProvider from "@/providers/DeckProvider";
import GameProvider from "@/providers/GameProvider";
import PitProvider from "@/providers/PitProvider";
import PlayersProvider from "@/providers/PlayersProvider";
import "dotenv/config";
import "@/styles/globals.css";
import { AppProps } from "next/app";
import io from "socket.io-client";
import LoadingProvider from "@/providers/LoadingProvider";

export default function App({
    Component,
    pageProps
}: AppProps) {

    return (
        <LoadingProvider>
            <PlayersProvider>
                <GameProvider>
                    <PitProvider>
                        <DeckProvider>
                            <Component {...pageProps} />
                        </DeckProvider>
                    </PitProvider>
                </GameProvider>
            </PlayersProvider>
        </LoadingProvider>
    );
}

export const socket = io(`http://${process.env.NEXT_PUBLIC_HOST}:${process.env.NEXT_PUBLIC_PORT}`);
