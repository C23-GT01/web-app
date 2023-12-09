import CardResource from "../Elements/CardResource";
import Section from "./Index";


const Resources = ({data}) => {
  
  return (
    <Section title='Bahan Baku'>
      <div className="flex gap-4 w-full overflow-auto scrollbar-none py-8 ">
        {
         data.length > 0
            ? (
             data.map((resource, index) => (
                <CardResource key={index} name={resource.name} description={resource.description} src={resource.image} umkm={resource.umkm || null} location={resource.location.name || null} lat={resource.location.lat || null} lng={resource.location.lng || null} />
              ))
            )
            : (<p className="menu-list__empty">Nout Found</p>)
        }
      </div>
    </Section>
  );
};

export default Resources;