import CardSummary from "../Elements/ItemSummary";

import { getDetail } from "../../utils/data";

const summary = getDetail()[0].data.product.contribution;

const Summary = () => {
    return (
        <div className="py-4 xl:px-0 p-4 bg-white">
            <h1 className="font-h1 font-inter text-xl text-center mb-8">Dengan membeli produk ini Anda telah mendukung ...</h1>
            <div className="flex gap-8 flex-wrap justify-start sm:justify-center">
                {
                    summary.length > 0
                        ? (
                            summary.map((code, index) => (
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