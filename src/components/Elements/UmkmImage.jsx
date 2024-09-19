// import usePlaceholder from "../../hooks/usePlaceholder";

// const ImageBox = ({ src }) => {
//   let image = usePlaceholder();
//   if (src[0]) {
//     image = src[0];
//   }

//   return (
//     <img
//       src={image}
//       className="w-full  max-h-[420px] object-cover block"
//       alt="img"
//     />
//   );
// };

// export default ImageBox;

import usePlaceholder from "../../hooks/usePlaceholder";

const ImageBox = ({ src }) => {
  let image = usePlaceholder();
  if (src[0]) {
    image = encodeURI(src[0]);
  }

  return (
    <div
      className="w-full min-h-[120px] h-fit bg-fixed bg-contain  bg-top"
      style={{ backgroundImage: `url(${image})` }}
    >
      <img
        src={image}
        className="w-full  max-h-[420px] object-cover block opacity-0"
        alt="img"
      />
    </div>
  );
};

export default ImageBox;
