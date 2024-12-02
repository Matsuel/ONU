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
        <button
            {...props}
            className={cn(
                "border border-white p-4 rounded-xl bg-transparent hover:bg-white hover:bg-opacity-10 transition-all duration-300",
                className
            )}
        >
            {label}
            {children}
        </button>
    )
}

export default Button;
