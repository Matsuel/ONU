import React from 'react'
import Button from './ui/Button'
import { useRouter } from 'next/router'

interface EndGameProps {
    winner: string
}

const EndGame = ({
    winner
}: EndGameProps) => {

    const router = useRouter()

    return (
        <div className='absolute w-full h-full flex justify-center items-center bg-transparent'>

            <div className='w-[50%] h-auto bg-white rounded-xl'>
                <h4 className='text-2xl text-center'>Partie terminée</h4>

                <p className='text-2xl text-center'>Le gagnant est {winner}</p>

                <div className='flex flex-row justify-center'>
                    <Button onClick={() => router.replace('/')}>
                        Quitter
                    </Button>
                </div>

            </div>

        </div>
    )
}

export default EndGame