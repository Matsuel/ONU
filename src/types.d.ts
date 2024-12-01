import { Dispatch, SetStateAction } from "react";

export interface GameCreationStatus {
    uuid: string,
    message: string,
    status: string,
    playerUuid: string,
}

export interface ProviderProps {
    children: ode
}

export interface Cards {
    color?: 'r' | 'g' | 'b' | 'y',
    number?: number,
    special?: 'plus2' | 'skip' | 'rev' | 'plus4' | 'changecolor',
    changecolor?: boolean,
    isOverOneHandOld?: boolean,
}

export interface Player {
    uuid: string,
    name: string,
    cards: Cards[],
}

interface PlayersContextType {
    players: Player[],
    setPlayers: Dispatch<SetStateAction<Player[]>>,
    playerTurn: number,
    setPlayerTurn: Dispatch<SetStateAction<number>>,
    timer: number,
    setTimer: Dispatch<SetStateAction<number>>
}

interface PitProviderType {
    pit: Stack<Cards> | null,
    setPit: Dispatch<SetStateAction<Stack<Cards> | null>>
}

interface LoadingContextType {
    loading: boolean;
    setLoading: Dispatch<SetStateAction<boolean>>;
}

interface DeckContextType {
    deck: LinkedList<Cards> | null,
    setDeck: Dispatch<SetStateAction<LinkedList<Cards> | null>>
}

interface GameContextType {
    uuid: string;
    setUuid: Dispatch<SetStateAction<string>>;
    ended: boolean;
    setEnded: Dispatch<SetStateAction<boolean>>;
    winner: string;
    setWinner: Dispatch<SetStateAction<string>>;
}
