import { MdLocationOn } from "react-icons/md";
import { MdPeople } from "react-icons/md";
import Icon from "./Icon";
import placeholder from '../../assets/img/placeholder.jpg'
import { LazyLoadImage } from "react-lazy-load-image-component";

const ProdusenBox = ({ src, name = "...", employe = "...", location = "...", lat, lng, id }) => {
    return (
        <div className="flex items-center gap-8 mt-6">
            <LazyLoadImage src={src} placeholderSrc={placeholder} className="rounded-full w-32 md:w-48" alt="" />
            <div className="flex flex-col gap-2">
                <a href={`/umkm/${id}`}><h1 className="font-inter text-2xl color-[brown] font-semibold" >{name}</h1></a>
                <p className="flex gap-2 items-center font-bold ">
                    <Icon size="h-[37x] w-[37px]" active={true}><MdPeople /></Icon>
                    {employe} karyawan
                </p>
                <a href={`https://maps.google.com/?q=${lat},${lng}`} target="_blank" rel="noopener noreferrer">
                    <p className="flex gap-2 items-center font-bold  ">
                        <Icon size="h-[37x] w-[37px]" active={true}><MdLocationOn /></Icon>
                        {location}
                    </p>
                </a>
            </div>
        </div>
    )
}

export default ProdusenBox;