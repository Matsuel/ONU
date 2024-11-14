import React from "react"
import Title from "@/components/ui/Title"
import CustomLink from "@/components/ui/CustomLink"


export default function Home() {
    return (
        <div className='bg-white text-black h-screen w-screen'>
            <Title title='ONU' />
            <div className='flex justify-center gap-4 pt-80 flex-col items-center'>
                <CustomLink href="/join" label="Rejoindre une partie" />
                <CustomLink href="/create" label="Créer une partie" />
            </div>
        </div>
    )
}
