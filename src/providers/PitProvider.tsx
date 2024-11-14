import React, { createContext, useState } from 'react'
import { Stack } from '@/structs/stack'
import Cards from '@/interface/cards'
import { ProviderProps } from '@/types'

interface PitProviderType {
    pit: Stack<Cards> | null,
    setPit: React.Dispatch<React.SetStateAction<Stack<Cards> | null>>
}

export const PitContext = createContext({} as PitProviderType)

const PitProvider = ({
    children
}: ProviderProps) => {

    const [pit, setPit] = useState<Stack<Cards> | null>(null);


    return (
        <PitContext.Provider value={{ pit, setPit }}>
            {children}
        </PitContext.Provider>
    )
}

export default PitProvider
