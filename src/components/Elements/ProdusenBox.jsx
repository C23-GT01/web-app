import { MdLocationOn } from "react-icons/md";
import { MdPeople } from "react-icons/md";
import Icon from "./Icon";
import placeholder from "../../assets/img/placeholder.jpg";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";

const ProdusenBox = ({
  logo,
  name = "...",
  employe = "...",
  location = "...",
  slug,
}) => {
  return (
    <div className="flex items-center flex-col sm:flex-row gap-8 mt-6">
      <Link to={`/umkm/${slug}`}>
        <LazyLoadImage
          src={logo}
          placeholderSrc={placeholder}
          className="rounded-full w-48 sm:w-32 md:w-48 md:h-48"
          alt=""
        />
      </Link>
      <div className="flex flex-col gap-2 flex-1">
        <Link to={`/umkm/${slug}`}>
          <h1 className="font-inter text-2xl color-[brown] font-semibold">
            {name}
          </h1>
        </Link>
        {employe !== 0 && (
          <p className="flex gap-2 items-center font-bold ">
            <Icon size="h-[37x] w-[37px]" active={true}>
              <MdPeople />
            </Icon>
            {employe} karyawan
          </p>
        )}
        <a
          href={`https://maps.google.com/?q=${location.lat},${location.lng}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="flex gap-2 items-center font-bold  ">
            <Icon size="h-[37x] w-[37px]" active={true}>
              <MdLocationOn />
            </Icon>
            <p className="flex-1">{location.name}</p>
          </div>
        </a>
      </div>
    </div>
  );
};

export default ProdusenBox;
