import CardProcess from "../Elements/CardProcess";

const Process = ({ src }) => {
  return (
    <div className="py-4 xl:px-0 p-4 bg-white">
      <h1 className="font-h1 font-inter text-xl">Proses Produksi</h1>
      <div className="flex">
        <div className="md:w-2 h-[1] box-border md:pt-32 md:pb-24 translate-x-[50px] pt-32  md:translate-x-[98px]">
          <div className="w-full h-full bg-[#886345]"></div>
        </div>
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