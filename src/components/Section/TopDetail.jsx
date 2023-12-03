import ImageBox from "../Elements/Image-box";
import NamePrice from "../Elements/NamePrice";
import DescriptionProduct from "../Elements/DesriptionProduct";

const TopDetail = ({ src, name, price, description }) => {

  return (
    <div className="py-4 xl:px-0 p-4 mt-32">
      <div className="flex gap-4 w-full overflow-x-auto scrollbar-thin py-8 " >
        {
          src.length > 0
            ? (
              src.map((src) => (
                <ImageBox key={src} src={src} />
              ))
            )
            : (<p className="menu-list__empty">Nout Found</p>)
        }
      </div>
      <NamePrice name={name} price={price} />
      <DescriptionProduct>{description}</DescriptionProduct>
    </div>
  );
};

export default TopDetail;