import Link from "next/link"
import React from "react"
import Button from "./Button"

interface CustomLinkProps {
    href: string
    label: string
}

const CustomLink = ({
    href,
    label
}: CustomLinkProps) => {
    return (
        <Link href={href}>
            <Button label={label} />
        </Link>
    )
}

export default CustomLink
