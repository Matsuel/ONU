const Title = ({
    title
}: { title: string }) => {
    return (
        <h1 className='flex justify-center font-bold text-9xl pt-8 drop-shadow-2xl'>{title}</h1>
    )
}

export default Title;