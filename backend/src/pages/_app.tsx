import "dotenv/config";
import "@/styles/globals.css";
import { AppProps } from "next/app";
import io from "socket.io-client";
import Providers from "@/providers";

export default function App({
    Component,
    pageProps
}: AppProps) {

    return (
        <Providers>
            <Component {...pageProps} />
        </Providers>
    );
}

export const socket = io(`https://${process.env.NEXT_PUBLIC_HOST}:${process.env.NEXT_PUBLIC_PORT}`);
