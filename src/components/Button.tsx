import { cn } from "@/utils/cn";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    label?: string
}

const Button = ({
    label,
    className,
    children,
    ...props
}: ButtonProps) => {
    return (
        <button {...props} className={cn(`py-4 px-2 rounded-lg bg-gradient-to-l from-[#FF4201] to-[#FF6603]`, className)}>
            {label}
            {children}
        </button>
    )
}

export default Button;