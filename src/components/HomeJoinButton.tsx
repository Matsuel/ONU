import Link from "next/link";
import Button from "./Button";

const HomeJoinButton = () => {
    return (
        <div className='flex justify-center gap-4'>
            <Link href="/join">
                <Button label='Rejoindre une partie'/>
            </Link>
        </div>
    );
}

export default HomeJoinButton;