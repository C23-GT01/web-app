import CardResource from "../Elements/CardResource";
import { getDetail } from "../../utils/data";

const resources = getDetail()[0].data.product.resources;

const Resources = ({ src }) => {
  return (
    <div className="py-4 xl:px-0 p-4">
      <h1 className="font-h1 font-inter text-xl">Bahan Baku</h1>
      <div className="flex gap-4 w-full overflow-auto scrollbar-thin py-8 ">
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
    </div>
  );
};

export default Resources;