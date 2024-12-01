import React from 'react'
import Image from 'next/image'
import Title from '@/components/ui/Title'
import { motion } from 'framer-motion'
import { containerVariants, imageVariants, titleVariants } from '@/constantes/home'
import TabTitle from '../game/TabTitle'
import CardDisplay from '../game/card/CardDisplay'

const HomeLayout = () => {

    return (
        <motion.div
            className="flex flex-col gap-48 items-center w-5/6"
            variants={containerVariants}
        >
            <TabTitle title="ONU" />
            <motion.div variants={titleVariants}>
                <Title title="ONU" />
            </motion.div>
            <div className="flex flex-col items-center gap-10">
                <motion.div
                    className="felx flex-col text-center"
                    variants={containerVariants}
                >
                    <h2 className="font-semibold text-3xl">
                        Bienvenue sur le jeu du UNO
                    </h2>
                </motion.div>
                <motion.div variants={imageVariants} className='flex flex-row gap-1'>
                    <CardDisplay card={{'color': 'g','number': 0}}/>
                    <CardDisplay card={{'color': 'r','special': 'rev'}}/>
                    <CardDisplay card={{'special': 'plus4'}}/>
                    <CardDisplay card={{'color': 'b','number': 8}}/>
                    <CardDisplay card={{'special': 'changecolor'}}/>
                </motion.div>
            </div>
        </motion.div>
    )
}

export default HomeLayout