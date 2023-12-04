import CardResource from "../Elements/CardResource";
import { getDetail } from "../../utils/data";
import Section from "./Index";

const resources = getDetail()[0].data.product.resources;

const Resources = ({ src }) => {
  return (
    <Section title='Bahan Baku'>
      <div className="flex gap-4 w-full overflow-auto scrollbar-none py-8 ">
        {
          resources.length > 0
            ? (
              resources.map((resource, index) => (
                <CardResource key={index} name={resource.name} description={resource.deskripsi} src={resource.image} umkm={resource.umkm || null} location={resource.location.name || null} lat={resource.location.lat || null} lng={resource.location.lng || null} />
              ))
            )
            : (<p className="menu-list__empty">Nout Found</p>)
        }
      </div>
    </Section>
  );
};

export default Resources;