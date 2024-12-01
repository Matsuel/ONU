import Button from "@/components/ui/Button";
import {
    emitStartGame,
    onStartGame,
} from "@/utils/socketEvents";
import { useEffect } from "react";
import { useRouter } from "next/router";
import PinNumber from "@/components/ui/PinNumber";


interface CreateUuidOptionProps {
    uuid: string;
    pin: number;
}

const CreateUuidOption = ({ uuid, pin }: CreateUuidOptionProps) => {
    const router = useRouter();

    const copyToClipboard = () => {
        navigator.clipboard.writeText(pin.toString());
    };

    useEffect(() => {

        onStartGame((msg) => {
            if (msg.uuid) {
                router.push({ pathname: `/game/${msg.uuid}` });
            } else {
                console.error("Game not found");
            }
        });
    }, [router]);
    return (
        <div className="flex flex-col items-center">
            <PinNumber pin={pin} />
            <div className="flex gap-4">
                <Button label="Copier le code de la partie" onClick={copyToClipboard} />
                <Button label="Commencer la partie" onClick={() => emitStartGame(uuid)} />
            </div>
        </div>
    );
}

export default CreateUuidOption;
