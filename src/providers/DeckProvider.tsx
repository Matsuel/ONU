import React, { createContext, useState } from 'react'
import { LinkedList } from '../../structs/linkedArray'
import Cards from '../../interface/cards'
import { ProviderProps } from '@/types'

interface DeckContextType {
    deck: LinkedList<Cards> | null,
    setDeck: React.Dispatch<React.SetStateAction<LinkedList<Cards> | null>>
}

export const DeckContext = createContext({} as DeckContextType)

const DeckProvider = ({
    children
}: ProviderProps) => {

    const [deck, setDeck] = useState<LinkedList<Cards> | null>(null);

    return (
        <DeckContext.Provider value={{ deck, setDeck }}>
            {children}
        </DeckContext.Provider>
    )
}

export default DeckProvider
