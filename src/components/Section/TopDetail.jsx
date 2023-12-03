import ImageBox from "../Elements/Image-box";
import NamePrice from "../Elements/NamePrice";
import DescriptionProduct from "../Elements/DesriptionProduct";

const TopDetail = ({ src, name, price, description }) => {

  return (
    <div className="py-4 xl:px-0 p-4 mt-32">
      <ImageBox src={src} />
      <NamePrice name={name} price={price} />
      <DescriptionProduct>{description}</DescriptionProduct>
    </div>
  );
};

export default TopDetail;