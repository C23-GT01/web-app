import CardImpact from "../Elements/CardImpact";
import Section from "./Index";
import Summary from "./Summary";


const Impact = ({name="Produk Impact", useSummary=false, data, summary=false}) => {
  return (
    <Section title={name}>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 gap-y-8 mt-4">
        {
          data.length > 0
            ? (
              data.map((impact, index) => (
                <CardImpact key={index} name={impact.name} description={impact.description} src={impact.image} />
              ))
            )
            : (<p className="menu-list__empty">Not Impact</p>)
        }
      </div>
      {
        (useSummary)?<Summary data={summary} />:""
      }
    </Section>
  );
};

export default Impact;