const Title = ({
    title
}: { title: string }) => {
    return (
        <h1 className='flex justify-center font-bold text-9xl pt-8'>{title}</h1>
    )
}

export default Title;