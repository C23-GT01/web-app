import ProdusenBox from "../Elements/ProdusenBox";
import { getDetail } from "../../utils/data";

const produsen = getDetail()[0].data.product.umkm;
console.log(produsen);

const Produsen = ({ src }) => {
    return (
        <div className="py-4 xl:px-0 p-4">
            <h1 className="font-h1 font-inter text-2xl mb-8 text-center">Produsen</h1>
            {
                (produsen)
                    ? (
                        <ProdusenBox key={produsen.id} src={produsen.logo} name={produsen.name} employe={produsen.employe} location={produsen.location.name} />
                    )
                    : (<p className="menu-list__empty">Nout Found</p>)
            }
        </div>
    )
}

export default Produsen;