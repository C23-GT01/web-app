import CardProduct from "../Elements/CardProduct";
import Section from "./Section";


const Products = () => {
  return (
    <Section title="Rekomendasi Produk">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4 mt-4">
        <CardProduct id={'product-IKqPltKAqIRWSNPw'}/>
        <CardProduct />
        <CardProduct />
        <CardProduct />
        <CardProduct />
        <CardProduct />
        <CardProduct />
        <CardProduct />
        <CardProduct />
      </div>
    </Section>
  );
};

export default Products;