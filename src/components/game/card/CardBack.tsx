import Image from 'next/image'
import React from 'react'

const CardBack = () => {
    return (
        <Image
            src="/Cards/back.png"
            alt="back card"
            className='w-24 cursor-not-allowed'
            width={100}
            height={100}
        />
    )
}

export default CardBack
