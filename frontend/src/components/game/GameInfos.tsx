import React from 'react'
import Timer from './Timer'
import CurrentColor from './CurrentColor'

const GameInfos = () => {
    return (
        <div className='flex flex-col justify-center items-center gap-3'>
            <Timer />
            <CurrentColor />
        </div>
    )
}

export default GameInfos