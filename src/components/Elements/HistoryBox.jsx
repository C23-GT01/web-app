const HistoryBox = ({ image, text }) => {
    return (
        <div className="flex gap-5 flex-wrap">
            <img src={image} alt="history umkm" className="w-69 rounded-2xl drop-shadow-xl" />
            <div className="flex flex-col gap-5">
                <p>{text}</p>
            </div>
        </div>
    );
}

export default HistoryBox;