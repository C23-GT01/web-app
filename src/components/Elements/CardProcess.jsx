const CardProcess = ({ src }) => {
    return (
        <div className="flex mt-8" >
            <div className="w-48 h-48 flex justify-center items-center">
                <div className="w-5 h-5 bg-[#886345] rounded-full"></div>
            </div>
            <img src={src} className="w-64 h-48 object-cover block rounded-2xl drop-shadow-xl mx-4 mb-1" alt="img" />
            <div className="w-1/3">
                <h1 className="font-inter text-xl mb-2">Ervan</h1>
                <p className="mb-2">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quis recusandae fuga beatae eveniet libero natus? Ullam quasi eius, repellendus, saepe dolor alias velit voluptatem, voluptate tempore harum rem itaque dicta.</p>
            </div>
        </div>
    );
};

export default CardProcess;