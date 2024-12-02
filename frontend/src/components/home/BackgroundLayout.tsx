import React from 'react'
import { motion } from 'framer-motion'
import { containerVariants, titleVariants } from '@/constantes/home'
import TabTitle from '../game/TabTitle'
import Title from '../ui/Title'

interface Props {
    children: React.ReactNode
    title: string
    subtitle: string
}

const BackgroundLayout = ({
    children,
    title,
    subtitle
}: Props) => {
    return (
        <motion.div
            className="flex flex-col pl-24 w-full bg-no-repeat bg-right bg-contain"
            style={{ backgroundImage: "url('/Home/cards.png')" }}
            variants={containerVariants}
        >
            <TabTitle title={title} />
            <motion.div variants={titleVariants}>
                <Title title={title} />
            </motion.div>
            <div className="flex flex-col gap-10">
                <motion.div
                    className="felx flex-col"
                    variants={containerVariants}
                >
                    <h2 className="font-semibold text-3xl">
                        {subtitle}
                    </h2>
                </motion.div>
            </div>
            {children}
        </motion.div>
    )
}

export default BackgroundLayout