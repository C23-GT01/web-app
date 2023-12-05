import { MdLocationOn } from "react-icons/md";
import { MdShoppingBag } from "react-icons/md";
import Icon from "./Icon";
import placeholder from '../../assets/img/placeholder.jpg'
import { LazyLoadImage } from "react-lazy-load-image-component";

const CardResource = ({ src, name = "...", description = "...", umkm = null, location = null, lat, lng }) => {
    return (
        <div className="flex flex-col">
            <LazyLoadImage src={src} placeholderSrc={placeholder} className="w-72 h-48 object-cover block rounded-2xl drop-shadow-xl mb-1" alt="img" />
            <div className="w-64 pt-4">
                <h1 className="font-inter text-xl mb-2">{name}</h1>
                <p className="mb-2">{description}</p>
                <div>
                    {
                        (umkm !== null) &&
                        <p className="flex gap-2 items-center font-bold mb-2 mt-4">
                            <Icon size="h-[37x] w-[37px]" active={true}><MdShoppingBag /></Icon>
                            {umkm}
                        </p>
                    }
                    {
                        (location !== null) &&
                        <a href={`https://maps.google.com/?q=${lat},${lng}`} target="_blank" rel="noopener noreferrer">
                            <p className="flex gap-2 items-center font-bold">
                                <Icon size="h-[37px] w-[37px]" active={true}><MdLocationOn /></Icon>
                                {location}
                            </p>
                        </a>
                    }
                </div>

            </div>
        </div>
    );
};

export default CardResource;