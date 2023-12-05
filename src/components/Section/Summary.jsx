import CardSummary from "../Elements/ItemSummary";

const Summary = ({data}) => {
    return (
        <div className="py-4 xl:px-0 p-4 bg-white mt-12">
            <h1 className="font-h1 font-inter text-xl text-center mb-8">Dengan membeli produk ini Anda telah mendukung ...</h1>
            <div className="flex gap-8 flex-wrap justify-start sm:justify-center">
                {
                    data.length > 0
                        ? (
                            data.map((code, index) => (
                                <CardSummary key={index} code={code} />
                            ))
                        )
                        : (<p className="menu-list__empty">Umkm Indonesia</p>)
                }

            </div>
        </div>
    );
};

export default Summary;