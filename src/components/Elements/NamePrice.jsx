const NamePrice = ({ name, price }) => {
  return (
    <div className="flex py-4 justify-between items-center">
      <h1 className="font-h1 text-2xl font-inter">{name}</h1>
      <h1 className="font-h1 text-xl font-inter text-[#886345]">{price.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' }) }</h1>
    </div>
  );
};

export default NamePrice;