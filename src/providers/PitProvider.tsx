import React, { useState } from 'react'
import { Stack } from '@/structs/stack'
import { Cards, ProviderProps } from '@/types'
import PitContext from '@/contexts/PitContext';



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
