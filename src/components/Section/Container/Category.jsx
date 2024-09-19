import { ButtonLink } from "../../Elements/Button";

const Category = () => {
  return (
    <div className="my-8 flex gap-4">
      <ButtonLink>Semua Produk</ButtonLink>
      <ButtonLink className="bg-[#BBB]">Makanan</ButtonLink>
      <ButtonLink className="bg-[#BBB]">Fashion</ButtonLink>
      <ButtonLink className="bg-[#BBB]">Agrikultur</ButtonLink>
    </div>
  );
};

export default Category;
