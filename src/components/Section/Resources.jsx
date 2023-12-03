import CardResource from "../Elements/CardResource";

const Resources = ({ src }) => {
  return (
    <div className="py-4 xl:px-0 p-4">
      <h1 className="font-h1 font-inter text-xl">Bahan Baku</h1>
      <CardResource src={src} />
    </div>
  );
};

export default Resources;