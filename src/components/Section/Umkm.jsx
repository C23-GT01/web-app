import CardUmkm from "../Elements/CardUmkm";
import Section from "./Index";

const Umkm = () => {
  return (
    <Section title="UMKM Terdekat">
      <div className="flex gap-4 flex-wrap mt-4">
        <CardUmkm />
        <CardUmkm />
        <CardUmkm />
      </div>
    </Section>
  );
};

export default Umkm;