import placeholder from "../../assets/img/placeholder.jpg";
import { LazyLoadImage } from "react-lazy-load-image-component";

const CardProcess = ({ src, name, description }) => {
  return (
    <div className="flex gap-5 mb-10">
      <div className="flex items-center w-6 justify-center mr-6">
        <div className="w-5 h-5 bg-[#dc0000] rounded-full"></div>
      </div>
      <div className="flex flex-1 flex-col md:flex-row gap-5">
        <LazyLoadImage
          src={src}
          placeholderSrc={placeholder}
          className="w-full sm:w-48 md:w-64 rounded-2xl object-cover drop-shadow-2xl sm:min-h-48  md:min-h-64"
          alt="img"
        />
        <div className="flex-1 break-words">
          <h1 className="font-bold text-lg mb-2 font-inter">{name}</h1>
          <p className="whitespace-pre-line font-inter">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default CardProcess;
