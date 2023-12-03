import CardResource from "../Elements/CardResource";
import { getDetail } from "../../utils/data";

const resources = getDetail()[0].data.product.resources;

const Resources = ({ src }) => {
  return (
    <div className="py-4 xl:px-0 p-4">
      <h1 className="font-h1 font-inter text-xl">Bahan Baku</h1>
      <div className="flex gap-4 w-full overflow-x-auto scrollbar-thin py-8 ">
      {
          resources.length > 0 
          ? (
            resources.map((resource) => (
              <CardResource key={resource.name} name={resource.name} description={resource.deskripsi} src={resource.image} location={resource.location.name}/>
            ))
          )
          : ( <p className="menu-list__empty">Nout Found</p> )
        }
      </div>
    </div>
  );
};

export default Resources;