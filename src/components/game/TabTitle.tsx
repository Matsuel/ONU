import Head from 'next/head'
import React from 'react'

interface TabTitleProps {
    title: string
}

const TabTitle = ({
    title
}: TabTitleProps) => {
    return (
        <Head>
            <title>{title}</title>
        </Head>
    )
}

export default TabTitle