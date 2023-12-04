import CardImpact from "../Elements/CardImpact";

import { getDetail } from "../../utils/data";

const impact = getDetail()[0].data.product.impact;

const Impact = ({ src }) => {
  return (
    <div className="py-4 xl:px-0 p-4">
      <h1 className="font-h1 font-inter text-xl">Produk Impact</h1>
      <div className="flex gap-4 w-full flex-wrap overflow-x-auto scrollbar-thin py-8 ">
      {
          impact.length > 0
            ? (
              impact.map((impact, index) => (
                <CardImpact key={index} name={impact.name} description={impact.deskripsi} src={impact.image} />
              ))
            )
            : (<p className="menu-list__empty">Nout Found</p>)
        }
      </div>
    </div>
  );
};

export default Impact;