import placeholder from '../../assets/img/placeholder.jpg'
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from 'react-router-dom';


const CardProduct = ({ id, image, name, price }) => {
  return (
    <Link to={`/product/${id}`} >
      <div className="w-full  rounded-xl overflow-hidden flex flex-col  hover:scale-105 drop-shadow-sm" >
        <LazyLoadImage src={image[0]} placeholderSrc={placeholder} className="w-full h-40 object-cover rounded-2xl shadow-lg" alt="img" />
        <div className="flex py-4 justify-between items-start p-2">
          <h1 className="font-h1 text-sm font-inter">{name}</h1>
          <h1 className="font-h1 text-sm font-inter text-[#886345]">{price.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</h1>
        </div>
      </div>
    </Link>
  );
};

export default CardProduct;