const CardProduct = ({ id }) => {
  return (
    <a href={`/product/${id}`} >
      <div className="w-full h-56 bg-slate-600 rounded-xl overflow-hidden flex flex-col  hover:scale-105 drop-shadow-sm" >
        <div className="bg-slate-300 w-full h-4/5">

        </div>
        <div>

        </div>
      </div>
    </a>
  );
};

export default CardProduct;