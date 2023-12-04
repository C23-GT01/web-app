import CardUmkm from "../Elements/CardUmkm";
import Section from "./Index";

const Umkm = ({ umkm }) => {
  return (
    <Section title="UMKM Terdekat">
      <div className="flex gap-4 flex-wrap mt-4">
        {
          umkm.length > 0
            ? (
              umkm.map((umkm, index) => (
                <CardUmkm id={umkm.id} key={index} name={umkm.name} image={umkm.image} />
              ))
            )
            : (<p className="menu-list__empty">Not Found</p>)
        }
      </div>
    </Section>
  );
};

export default Umkm;