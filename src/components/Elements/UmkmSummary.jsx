const UmkmSummary = ({logo, name='...', description='...'}) => {
    return (
        <div className="bg-white py-4 xl:px-0 p-4">
            <div className="max-w-[1240px] mx-auto flex gap-4 flex-wrap sm:flex-nowrap ">
                <img src={logo} alt="" className="w-[130px] h-[130px] rounded-full" />
                <div>
                    <h1 className="font-h1 text-2xl font-inter">{name}</h1>
                    <p className="font-inter text-justify">{description}</p>
                </div>
            </div>
        </div>
    );
}

export default UmkmSummary;