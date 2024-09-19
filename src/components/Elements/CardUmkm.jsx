import placeholder from "../../assets/img/placeholder.jpg";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";

const CardUmkm = ({ id, name, slug, logo }) => {
  return (
    <div className="w-36 h-36">
      <Link to={`/umkm/${slug}`}>
        <div className="hover:scale-110 w-36 h-36">
          <LazyLoadImage
            width={"100%"}
            height={"100%"}
            src={logo}
            placeholderSrc={placeholder}
            className="h-full rounded-full overflow-hidden flex flex-col shadow-xl"
          />
          {/* <p className="absolute w-full leading-[144px] top-0 text-center text-white font-bold opacity-70 text-2xl">5km</p> */}
        </div>
        <p className="text-center text-sm font-semibold mt-4 w-full">{name}</p>
      </Link>
    </div>
  );
};

export default CardUmkm;
