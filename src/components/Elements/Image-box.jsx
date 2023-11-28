const ImageBox = ({ src }) => {
  return (
    <div className="flex gap-4 w-full overflow-x-auto scrollbar-thin py-8 " >
      <img src={src} className="w-96 h-64 object-cover block rounded-2xl drop-shadow-xl" alt="img" />
      <img src={src} className="w-96 h-64 object-cover block rounded-2xl drop-shadow-xl" alt="img" />
      <img src={src} className="w-96 h-64 object-cover block rounded-2xl drop-shadow-xl" alt="img" />
      <img src={src} className="w-96 h-64 object-cover block rounded-2xl drop-shadow-xl" alt="img" />
    </div>
  );
};

export default ImageBox;