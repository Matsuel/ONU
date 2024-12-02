import React from 'react'
import { motion } from 'framer-motion'
import CardDisplay from './CardDisplay'
import { imageVariants } from '@/constantes/home'

const CardsRow = () => {
    return (
        <motion.div variants={imageVariants} className='flex flex-row gap-1 justify-center mt-8'>
            <CardDisplay card={{ 'color': 'g', 'number': 0 }} />
            <CardDisplay card={{ 'color': 'r', 'special': 'rev' }} />
            <CardDisplay card={{ 'special': 'plus4' }} />
            <CardDisplay card={{ 'color': 'b', 'number': 8 }} />
            <CardDisplay card={{ 'special': 'changecolor' }} />
        </motion.div>
    )
}

export default CardsRow