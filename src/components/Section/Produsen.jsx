import ProdusenBox from "../Elements/ProdusenBox";
import Section from "./Index";

const Produsen = ({ data }) => {
  return (
    <Section title="Produsen" nomb>
      {data ? (
        <ProdusenBox key={data.id} {...data} />
      ) : (
        <p className="menu-list__empty">Nout Found</p>
      )}
    </Section>
  );
};

export default Produsen;
