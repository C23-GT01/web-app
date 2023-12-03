import CardSummary from "../Elements/ItemSummary";

const Summary = () => {
    return (
        <div className="py-4 xl:px-0 p-4 bg-white">
            <h1 className="font-h1 font-inter text-xl text-center mb-8">Dengan membeli produk ini Anda telah...</h1>
            <div className="flex gap-8 flex-wrap justify-start sm:justify-center">
                <CardSummary>Melestarikan budaya</CardSummary>
                <CardSummary>Menjaga kesuburan tanah</CardSummary>
                <CardSummary>Menjaga lingkungan</CardSummary>
                <CardSummary>Memberdayasjmhngfkan wanita</CardSummary>
                <CardSummary>Memberdayakan wanita</CardSummary>
            </div>
        </div>
    );
};

export default Summary;