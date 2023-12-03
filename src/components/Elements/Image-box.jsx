const ImageBox = ({ src }) => {
  return (

      <img src={src} className="w-96 h-64 object-cover block rounded-2xl drop-shadow-xl" alt="img" />
    
  );
};

export default ImageBox;