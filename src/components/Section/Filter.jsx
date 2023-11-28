import FilterItem from "../Elements/FilterItem";

const FIlter = () => {
  return (
    <div className="flex gap-4 max-w-[1240px] overflow-x-auto xl:px-0  p-4">
      <FilterItem>Semua Kategori</FilterItem>
      <FilterItem>Makanan</FilterItem>
      <FilterItem>Minuman</FilterItem>
    </div>
  );
};

export default FIlter;