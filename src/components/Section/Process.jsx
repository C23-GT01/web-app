import CardProcess from "../Elements/CardProcess";

const Process = ({ src }) => {
  return (
    <div className="py-4 xl:px-0 p-4">
      <h1 className="font-h1 font-inter text-xl">Proses Produksi</h1>
      <div className="flex">
        <div></div>
        <div>
          <CardProcess src={src} />
          <CardProcess src={src} />
          <CardProcess src={src} />
          <CardProcess src={src} />
        </div>
      </div>
    </div>
  );
};

export default Process;