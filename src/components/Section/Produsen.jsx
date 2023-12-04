import ProdusenBox from "../Elements/ProdusenBox";
import Section from "./Index";
import { getDetail } from "../../utils/data";

const produsen = getDetail()[0].data.product.umkm;
console.log(produsen);

const Produsen = () => {
    return (
        <Section title="Produsen" nomb>
            {
                (produsen)
                    ? (
                        <ProdusenBox id= {produsen.id} key={produsen.id} src={produsen.logo} name={produsen.name} employe={produsen.employe} location={produsen.location.name} lat={produsen.location.lat} lng={produsen.location.lng} />
                    )
                    : (<p className="menu-list__empty">Nout Found</p>)
            }
        </Section>
    )
}

export default Produsen;