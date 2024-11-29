import { useContext, useState } from "react"
import { socket } from "@/pages/_app"
import { isCardPlayable } from "../../cardsFunction"
import CardDisplay from "./CardDisplay"
import CardBack from "./CardBack"
import ColorModal from "./ColorModal"
import { Cards, Player } from "@/types"
import PitContext from "@/contexts/PitContext"
import GameContext from "@/contexts/GameContext"
import PlayersContext from "@/contexts/PlayersContext"

interface CardProps {
    card: Cards
    cardIndex: number
    player: Player
    uuid: string
    sortedPlayers: Player[]
}

const Card = ({
    card,
    cardIndex,
    player,
    uuid,
    sortedPlayers
}: CardProps) => {
    const { pit } = useContext(PitContext)
    const { uuid: playerUuid } = useContext(GameContext)
    const { playerTurn, players } = useContext(PlayersContext)

    const [isHovered, setIsHovered] = useState(false)

    const handleHover = (value: boolean) => {
        if (!card.color && players[playerTurn].uuid 
            === player.uuid && players[playerTurn].uuid 
            === playerUuid) 
        { setIsHovered(value); }
    }

    const playCardOnClick = (
        cardIndex: number,
        card: Cards,
        player: Player,
        specialColor?: string
    ) => {
        socket.emit("playCard", {
            uuid,
            cardIndex,
            card,
            player,
            specialColor
        });
    };

    const notAllowed = "opacity-30 pointer-events-none"
    const allowed = "opactiy-100 hover:border-4 border-white rounded-xl transition-all"
    const isPlayable = isCardPlayable(card, pit.peek());
    const isPlayerTurn = players[playerTurn].uuid === player.uuid;
    const isCurrentPlayer = sortedPlayers[0].uuid === player.uuid;

    let canClientClickOnCard = "";
    if (isPlayerTurn) {
        if (isCurrentPlayer) {
            canClientClickOnCard = isPlayable ? allowed : notAllowed;
        } else {
            canClientClickOnCard = allowed + " pointer-events-none";
        }
    } else {
        canClientClickOnCard = notAllowed;
    }

    return (
        <button
            key={cardIndex}
            className={canClientClickOnCard}
            onMouseEnter={() => handleHover(true)}
            onMouseLeave={() => handleHover(false)}
            onClick={() => {
                setIsHovered(false)
                playCardOnClick(
                    cardIndex,
                    card,
                    player,
                )
            }}
        >
            {isHovered && <ColorModal 
                setIsHovered={setIsHovered} 
                uuid={uuid} 
                cardIndex={cardIndex} 
                card={card} 
                player={player} 
            />}
            {player.uuid === playerUuid ? <CardDisplay card={card} /> : <CardBack />}
        </button >
    )
}

export default Card
