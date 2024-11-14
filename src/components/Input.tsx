import { cn } from '@/utils/cn'
import React from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
}

const Input = ({
    className,
    ...props
}: InputProps) => {
    return (
        <input
            className={cn(`py-4 px-2 bg-transparent border-b border-white text-white focus:outline-none placeholder:text-white`, className)}
            {...props}
        />
    )
}

export default Input