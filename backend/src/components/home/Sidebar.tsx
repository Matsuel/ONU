import React from 'react'
import Button from '@/components/ui/Button'
import { motion } from 'framer-motion'
import { homeLinks } from '@/constantes/home'

interface SidebarProps {
    setPage: (page: "home" | "join" | "create") => void
}

const Sidebar = ({
    setPage
}: SidebarProps) => {

    const sidebarVariants = {
        hidden: { opacity: 0, x: "-100vw" },
        visible: { opacity: 1, x: 0, transition: { duration: 1.2 } },
        exit: { opacity: 0, x: "-100vw", transition: { duration: 1.2 } },
    };

    return (
        <motion.div
            className="flex flex-col gap-7 m-4 rounded-xl bg-[#424242] bg-opacity-55 p-4 w-1/6"
            variants={sidebarVariants}
        >
            <div className="flex flex-col gap-4">
                <h4 className="font-bold text-2xl text-center pt-5">OPTIONS</h4>
                <div className="border border-white mx-4"></div>
            </div>
            <div className="flex flex-col gap-5">
                {homeLinks.map((link) => (
                    <Button
                        key={link.title}
                        label={link.title}
                        onClick={() => setPage(link.pageToSet as "home" | "join" | "create")}
                    />
                ))}
            </div>
        </motion.div>
    )
}

export default Sidebar
