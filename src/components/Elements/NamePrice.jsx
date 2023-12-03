const NamePrice = ({name, price}) => {
  return (
    <div className="flex py-4 justify-between">
      <h1 className="font-h1 text-2xl font-inter">{name}</h1>
      <h1 className="font-h1 text-2xl font-inter">Rp {price}</h1>
    </div>
  );
};

export default NamePrice;