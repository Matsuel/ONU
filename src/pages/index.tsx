import React from "react"
import Title from "@/components/Title"
import HomeOptions from "@/components/HomeOptions"


export default function Home() {
    return (
        <div className='min-h-screen bg-center bg-cover bg-no-repeat'>
            <Title title='ONU' />
            <HomeOptions />
        </div>
    )
}
