import placeholder from '../../assets/img/placeholder.jpg'
import { LazyLoadImage } from "react-lazy-load-image-component";

const CardImpact = ({ src, description = '...', name = '...' }) => {
    return (
            <div className="flex flex-col">
                <LazyLoadImage src={src} placeholderSrc={placeholder} className="w-full  h-48 object-cover block rounded-2xl drop-shadow-xl mb-1" alt="img" />
                <div className="pt-4">
                    <h1 className="font-inter text-xl mb-2">{name}</h1>
                    <p className="mb-2">{description}</p>
                </div>
            </div>
    );
};

export default CardImpact;