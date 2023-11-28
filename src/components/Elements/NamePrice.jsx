const NamePrice = ({name, price}) => {
  return (
    <div className="flex py-4 justify-between">
      <h1 className="font-h1 font-inter">{name}</h1>
      <h1>Rp {price}</h1>
    </div>
  );
};

export default NamePrice;