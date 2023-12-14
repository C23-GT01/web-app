const FilterItem = ({ children, image }) => {
  return (
    <div className="flex flex-col items-center gap-2 w-[100px]">
      <div className="rounded-full w-[110px] h-[110px] ">
        <img src={image} alt="" />
      </div>
      <h3 className="font-inter font-semibold w-full text-center">{children}</h3>
    </div>
  );
};

export default FilterItem;