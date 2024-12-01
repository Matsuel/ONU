import React from 'react'

interface PinNumberProps {
    pin: number | string
}

const PinNumber = ({
    pin
}: PinNumberProps) => {
    return (
        <div className="flex flex-row justify-center items-center gap-2 mb-5">
            {pin.toString().split('').map((number, index) => (
                <div key={number + index} className="w-10 h-10 rounded-lg border border-white flex justify-center items-center">
                    <p className="text-whites font-bold text-xl">{number}</p>
                </div>
            ))}
        </div>
    )
}

export default PinNumber