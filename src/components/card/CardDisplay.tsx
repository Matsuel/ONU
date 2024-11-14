import Image from "next/image";
import Cards from "../../interface/cards"

interface CardDisplayProps {
    card: Cards | null,
}

const CardDisplay = ({
    card
}: CardDisplayProps) => {
    return (
        <div>
            {card && card.changecolor && (
                <Image
                    src={`/Cards/${card.special}.png`}
                    alt="special card"
                    className="w-24"
                    width={100}
                    height={100}
                />
            )}

            {card && card.special ? (
                <div>
                    {card.color ? (
                        <Image
                            src={`/Cards/${card.special}${card.color}.png`}
                            alt="special card"
                            className="w-24"
                            width={100}
                            height={100}
                        />
                    ) : (
                        <Image
                            src={`/Cards/${card.special}.png`}
                            alt="special card"
                            className="w-24"
                            width={100}
                            height={100}
                        />
                    )}
                </div>
            ) : (
                <div>
                    {card && (
                        <Image
                            src={`/Cards/${card.number}${card.color}.png`}
                            alt="base card"
                            className="w-24"
                            width={100}
                            height={100}
                        />
                    )}
                </div>
            )}
        </div>
    )
}

export default CardDisplay;