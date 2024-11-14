import React from 'react'

interface ClipboardProps {
    size?: number
    fill?: string
}

const Clipboard = ({
    size = 28,
    fill = '#fff'
}: ClipboardProps) => {

    return (
        <svg width={size} height={size} viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4.8418 21.9424C4.8418 23.8496 5.82617 24.834 7.70703 24.834H15.9336C17.8145 24.834 18.7988 23.8408 18.7988 21.9424V20.3164H20.293C22.1738 20.3164 23.1582 19.3232 23.1582 17.4248V5.35742C23.1582 3.4502 22.1738 2.45703 20.293 2.45703H12.0664C10.1855 2.45703 9.20117 3.4502 9.20117 5.35742V6.97461H7.70703C5.82617 6.97461 4.8418 7.97656 4.8418 9.875V21.9424ZM14.1055 5.6123C13.7188 5.6123 13.5078 5.34863 13.5078 5.05859V4.85645C13.5078 4.59277 13.7012 4.29395 14.1055 4.29395H18.2451C18.6582 4.29395 18.8428 4.59277 18.8428 4.85645V5.05859C18.8428 5.34863 18.6406 5.6123 18.2451 5.6123H14.1055ZM6.59082 21.8281V9.98926C6.59082 9.18066 7.0127 8.73242 7.86523 8.73242H10.5459V13.5137C10.5459 14.7881 11.1699 15.4033 12.4355 15.4033H17.0498V21.8281C17.0498 22.6367 16.6279 23.085 15.7754 23.085H7.85645C7.0127 23.085 6.59082 22.6367 6.59082 21.8281ZM12.6025 13.8652C12.2422 13.8652 12.084 13.7158 12.084 13.3467V9.06641L16.8125 13.8652H12.6025Z" fill={fill} />
        </svg>

    )
}

export default Clipboard