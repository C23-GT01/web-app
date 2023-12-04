import { Link } from "react-router-dom";


const CardUmkm = ({id, name, image}) => {
  return (
    <div>
      <Link to={`umkm/${id}`}>
        <div className="relative hover:scale-110">
          <img src={image} className="w-36 h-36 bg-slate-600 rounded-full overflow-hidden flex flex-col " />
          <p className="absolute w-full leading-[144px] top-0 text-center text-white font-bold opacity-70 text-2xl">5km</p>
        </div>
        <p className="">{name}</p>
      </Link>
    </div>

  );
};

export default CardUmkm;