const CardProduct = ({ id, image, name, price }) => {
  return (
    <a href={`/product/${id}`} >
      <div className="w-full  rounded-xl overflow-hidden flex flex-col  hover:scale-105 drop-shadow-sm" >
        <img src={image} className="w-full h-4/5 object-cover rounded-2xl" alt="img" />
        <div className="flex py-4 justify-between items-start p-2">
          <h1 className="font-h1 text-sm font-inter">{name}</h1>
          <h1 className="font-h1 text-sm font-inter text-[#886345]">{price.toLocaleString('id-ID', { style: 'currency', currency: 'IDR'}) }</h1>
        </div>
      </div>
    </a>
  );
};

export default CardProduct;