import CardImpact from "../Elements/CardImpact";

const Impact = ({ src }) => {
  return (
    <div className="py-4 xl:px-0 p-4">
      <h1 className="font-h1 font-inter text-xl">Produk Impact</h1>
      <div className="flex gap-4 w-full flex-wrap overflow-x-auto scrollbar-thin py-8 ">
        <CardImpact src={src} />
        <CardImpact src={src} />
        <CardImpact src={src} />
        <CardImpact src={src} />
        <CardImpact src={src} />
        <CardImpact src={src} />
        <CardImpact src={src} />
      </div>
    </div>
  );
};

export default Impact;