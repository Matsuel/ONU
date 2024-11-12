interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    label: string
}

const Button = ({label, ...props} : ButtonProps) => {
    return (
        <button {...props} className='py-4 px-2 rounded-lg bg-gradient-to-l from-[#FF4201] to-[#FF6603]'>
            {label}
        </button>
    )
}

export default Button;