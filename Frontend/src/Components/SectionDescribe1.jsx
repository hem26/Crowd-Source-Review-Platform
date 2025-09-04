const SectionDescribe1 = ({title, description}) =>{
    return <div className="flex flex-col justify-center md:justify-center items-center">
        <h1 className="text-6xl text-center font-bold text-blue-500">{title}</h1>
        <h3 className="text-xl text-center md:max-w-4xl mt-10">{description}</h3>
    </div>
}

export default SectionDescribe1;