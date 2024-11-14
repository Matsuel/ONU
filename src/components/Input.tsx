import { cn } from "@/utils/cn"
import React, { InputHTMLAttributes } from "react"

const Input = ({
    className,
    ...props
}: InputHTMLAttributes<HTMLInputElement>) => {
    return (
        <input
            className={cn("text-center font-semibold text-2xl py-4 px-2 bg-transparent border-b border-white text-white focus:outline-none placeholder:text-white", className)}
            {...props}
        />
    )
}

export default Input