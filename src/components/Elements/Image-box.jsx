import placeholder from "../../assets/img/placeholder.jpg";
import { LazyLoadImage } from "react-lazy-load-image-component";

const ImageBox = ({ src }) => {
  return (
    <div className="flex flex-col bg-white rounded-2xl w-64">
      <LazyLoadImage
        src={src}
        placeholderSrc={placeholder}
        className={ `w-64 h-64 object-cover block rounded-2xl drop-shadow-xl`}
        alt="img"
      />
      <div className="w-64"></div>
    </div>
  );
};

export default ImageBox;
