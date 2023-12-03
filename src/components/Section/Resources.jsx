import CardResource from "../Elements/CardResource";

const Resources = ({ src }) => {
  return (
    <div className="py-4 xl:px-0 p-4">
      <h1 className="font-h1 font-inter text-xl">Bahan Baku</h1>
      <div className="flex gap-4 w-full overflow-x-auto scrollbar-thin py-8 ">
        <CardResource src={src} />
        <CardResource src={src} />
        <CardResource src={src} />
        <CardResource src={src} />
      </div>
    </div>
  );
};

export default Resources;