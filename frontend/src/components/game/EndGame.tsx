import React from 'react'
import Button from '../ui/Button'
import { useRouter } from 'next/router'
import TabTitle from './TabTitle'
import CardsRow from './card/CardsRow'

interface EndGameProps {
    winner: string
}

const EndGame = ({
    winner
}: EndGameProps) => {
    const router = useRouter()

    return (
        <div className='absolute z-50 w-full h-full flex justify-center items-center bg-black2'>

            <TabTitle title='Fin de partie' />

            <div className='w-[50%] h-auto rounded-xl'>
                <h4 className='text-5xl text-center'>Partie terminée</h4>

                <p className='text-4xl text-center mt-2'>Le gagnant est {winner}</p>

                <CardsRow />

                <div className='flex flex-row justify-center mt-10'>
                    <Button onClick={() => router.replace('/')}>
                        Retourner à l'accueil
                    </Button>
                </div>

            </div>

        </div>
    )
}

export default EndGame
