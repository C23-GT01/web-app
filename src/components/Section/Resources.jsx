import ImageBox from "../Elements/Image-box";

const Resources = ({src}) => {
  return (
    <div className="py-4">

      <h1 className="font-h1 font-inter">Bahan Baku</h1>
      <ImageBox src={src} />
    </div>
  );
};

export default Resources;