import { Player } from "@/types";

export const divPlacement = (
    players: Player[], 
    index: number
) => {
    let className = "fixed flex justify-center ";

    let playersPlacement = [""];
    const bottomPlacement = "w-screen bottom-0 -translate-y-[25%]";
    const topPlacement = "w-screen top-0 translate-y-[25%]";
    const leftPlacement = "h-screen left-0 -translate-x-[45%] rotate-90";
    const rightPlacement = "h-screen right-0 translate-x-[45%] -rotate-90";

    if (players.length === 2) {
        playersPlacement = [bottomPlacement, topPlacement];
    } else if (players.length === 3) {
        playersPlacement = [bottomPlacement, leftPlacement, topPlacement];
    } else if (players.length === 4) {
        playersPlacement = [bottomPlacement, leftPlacement, topPlacement, rightPlacement];
    }

    className += playersPlacement[index];
    return className;
};
