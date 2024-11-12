import Link from "next/link";
import Button from "./Button";

const HomeCreateButton = () => {
    return (
        <div className='flex justify-center gap-4'>
            <Link href="/join">
                <Button label='Créer une partie'/>
            </Link>
        </div>
    );
}

export default HomeCreateButton;