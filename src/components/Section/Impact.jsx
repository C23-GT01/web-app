import CardImpact from "../Elements/CardImpact";
import Section from "./Index";
import Summary from "./Summary";

import { getDetail } from "../../utils/data";

const impact = getDetail()[0].data.product.impact;

const Impact = () => {
  return (
    <Section title="Produk Impact">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 gap-y-8 mt-4">
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
      <Summary />
    </Section>
  );
};

export default Impact;