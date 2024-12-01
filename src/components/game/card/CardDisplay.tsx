import { Cards } from "@/types";
import Image from "next/image";

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
                    width={100}
                    height={100}
                />
            )}

            {card && card.special && card.special === "plus4" && (
                <Image
                    src={`/Cards/${card.special}.png`}
                    alt="special card"
                    width={100}
                    height={100}
                />
            )}

            {card && card.special && card.special === "changecolor" && (
                <Image
                    src={`/Cards/${card.special}.png`}
                    alt="special card"
                    width={100}
                    height={100}
                />
            )}

            {card && card.special && card.special !== "plus4" && card.special !== "changecolor" && (
                <div>
                    {card.color ? (
                        <Image
                            src={`/Cards/${card.special}${card.color}.png`}
                            alt="special card"
                            width={100}
                            height={100}
                        />
                    ) : (
                        <Image
                            src={`/Cards/${card.special}.png`}
                            alt="special card"
                            width={100}
                            height={100}
                        />
                    )}
                </div>
            )}
            {card && card.number !== undefined && (
                <div>
                    {card && (
                        <Image
                            src={`/Cards/${card.number}${card.color}.png`}
                            alt="base card"
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
