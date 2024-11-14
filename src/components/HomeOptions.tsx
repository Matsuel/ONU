import CustomLink from './CustomLink';


const HomeOptions = () => {
    return (
        <div className='flex justify-center gap-4 pt-80'>
            <CustomLink href="/join" label="Rejoindre une partie" />
            <CustomLink href="/create" label="Créer une partie" />
        </div>
    );
}

export default HomeOptions;