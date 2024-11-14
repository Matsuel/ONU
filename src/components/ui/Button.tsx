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
        <button {...props} className={cn("bg-transparent", className)}>
            {label}
            {children}
        </button>
    )
}

export default Button;
