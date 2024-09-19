import Pencil from "./Pencil";
const NamePrice = ({ name, price, edited = false }) => {
  return (
    <div className="flex py-4 justify-between gap-4 items-start">
      <h1 className="font-h1 text-2xl font-inter">{name}</h1>
      {price > 0 && (
        <h1 className="font-h1 text-xl font-inter text-[#886345]">
          {new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            maximumFractionDigits: 0,
          }).format(price)}
        </h1>
      )}
    </div>
  );
};

export default NamePrice;
