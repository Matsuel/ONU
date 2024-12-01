import React from 'react'
import LoadingProvider from './LoadingProvider';
import PlayersProvider from './PlayersProvider';
import GameProvider from './GameProvider';
import PitProvider from './PitProvider';
import DeckProvider from './DeckProvider';

const Providers = ({ children }: { children: React.ReactNode }) => {
    return (
        <LoadingProvider>
            <PlayersProvider>
                <GameProvider>
                    <PitProvider>
                        <DeckProvider>
                            {children}
                        </DeckProvider>
                    </PitProvider>
                </GameProvider>
            </PlayersProvider>
        </LoadingProvider>
    )
}

export default Providers