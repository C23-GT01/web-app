import { Link } from "react-router-dom";


const CardUmkm = () => {
  return (
    <Link to='/product'>
      <div className="w-52 h-52 bg-slate-600 rounded-full overflow-hidden flex flex-col hover:animate-pulse" >
        <div>

        </div>
      </div>
    </Link>
  );
};

export default CardUmkm;