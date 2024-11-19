import React, { useState } from 'react'
import { LinkedList } from '@/structs/linkedArray'
import { Cards, ProviderProps } from '@/types'
import DeckContext from '@/contexts/DeckContext';


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
