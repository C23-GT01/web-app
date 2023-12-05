import placeholder from '../../assets/img/placeholder.jpg'
import { LazyLoadImage } from "react-lazy-load-image-component";

const CardUmkm = ({id, name, image}) => {
  return (
    <div>
      <a href={`umkm/${id}`}>
        <div className="relative hover:scale-110">
          <LazyLoadImage src={image} placeholderSrc={placeholder} className="w-36 h-36 bg-slate-600 rounded-full overflow-hidden flex flex-col " />
          {/* <p className="absolute w-full leading-[144px] top-0 text-center text-white font-bold opacity-70 text-2xl">5km</p> */}
        </div>
        <p className="">{name}</p>
      </a>
    </div>

  );
};

export default CardUmkm;