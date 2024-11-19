export interface ProviderProps {
    children: React.ReactNode
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
    setPlayers: React.Dispatch<React.SetStateAction<Player[]>>,
    playerTurn: number,
    setPlayerTurn: React.Dispatch<React.SetStateAction<number>>,
    timer: number,
    setTimer: React.Dispatch<React.SetStateAction<number>>
}

interface PitProviderType {
    pit: Stack<Cards> | null,
    setPit: React.Dispatch<React.SetStateAction<Stack<Cards> | null>>
}

interface LoadingContextType {
    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

interface DeckContextType {
    deck: LinkedList<Cards> | null,
    setDeck: React.Dispatch<React.SetStateAction<LinkedList<Cards> | null>>
}

interface GameContextType {
    uuid: string;
    setUuid: React.Dispatch<React.SetStateAction<string>>;
    ended: boolean;
    setEnded: React.Dispatch<React.SetStateAction<boolean>>;
    winner: string;
    setWinner: React.Dispatch<React.SetStateAction<string>>;
}