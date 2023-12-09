import CardProduct from "../Elements/CardProduct";
import Section from "./Index";

// import { getAllProduct} from "../../utils/data";

// const products = getAllProduct()[0].data.products;

const Products = ({name="Rekomendasi Produk", data}) => {
  return (
    <Section title={name} nomb>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4 mt-4">
        {
          data.length > 0 
          ? (
            data.map((product) => (
              <CardProduct key={product.id} {...product} />
            ))
          )
          : ( <p className="menu-list__empty">Nout Found</p> )
        }
      </div>
    </Section>
  );
};

export default Products;