import CardUmkm from "../Elements/CardUmkm";
import Section from "./Index";
import { ButtonLink } from "../Elements/Button";

const Umkm = ({ umkm }) => {
  const duplicatedUmkm = [...umkm, ...umkm]; // Duplikat daftar umkm

  return (
    <Section title="UMKM Partner">
      <div className="overflow-hidden whitespace-nowrap py-10">
        <div className="flex items-center animate-marquee space-x-6">
          {duplicatedUmkm.map((umkm, index) => (
            <CardUmkm
              key={index}
              {...umkm}
            />
          ))}
        </div>
      </div>
      <div className="w-full mt-12 flex justify-center">
        <ButtonLink
          href="/umkm/page/1"
          className="mx-auto text-center font-inter text-xl mt-8 font-semibold w-fit"
        >
          Tampilkan Semua UMKM
        </ButtonLink>
      </div>
    </Section>
  );
};

export default Umkm;
