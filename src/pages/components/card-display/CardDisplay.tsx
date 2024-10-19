import Cards from "../../../../interface/cards"
import Player from "../../../../interface/player";

interface CardDisplayProps {
    card: Cards,
}

const CardDisplay = ({ card }: CardDisplayProps) => {
    return (
        <div 
            className="opacity-40 hover:opacity-100 transition-all"
        >
            {card && card.special ? (
                <div>
                    {card.color ? (
                        <img 
                            src={`/Cards/${card.special}${card.color}.png`} 
                            alt="special card"
                            className="w-24"
                        />
                    ): (
                        <img 
                            src={`/Cards/${card.special}.png`} 
                            alt="special card"
                            className="w-24"
                        />
                    )}
                </div>
            ) : (
                <div>
                    {card && (
                        <img 
                            src={`/Cards/${card.number}${card.color}.png`} 
                            alt="base card"
                            className="w-24"
                        />
                    )}
                </div>
            )}
        </div>
    )
}

export default CardDisplay;
