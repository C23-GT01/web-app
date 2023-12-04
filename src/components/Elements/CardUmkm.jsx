import { Link } from "react-router-dom";


const CardUmkm = () => {
  return (
    <div>
      <Link to='/umkm/:id'>
        <div className="relative hover:scale-110">
          <img src="https://i.ibb.co/BwNSbMb/logo-mamo.jpg" className="w-36 h-36 bg-slate-600 rounded-full overflow-hidden flex flex-col " />
          <p className="absolute w-full leading-[144px] top-0 text-center text-white font-bold opacity-70 text-2xl">5km</p>
        </div>
        <p className="">Sambal Mamo</p>
      </Link>
    </div>

  );
};

export default CardUmkm;