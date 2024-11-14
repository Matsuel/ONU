import Link from 'next/link'
import Button from '../components/Button'
import HomeJoinButton from './HomeJoinButton';
import HomeCreateButton from './HomeCreateButton';


const HomeOptions = () => {
    return (
        <div className='flex justify-center gap-4 pt-80'>
            <HomeJoinButton />

            <HomeCreateButton />
        </div>
    );
}

export default HomeOptions;