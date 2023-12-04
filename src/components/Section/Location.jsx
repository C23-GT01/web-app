import Section from "./Index";
import Map from "../Elements/Map";
import MapDetail from "../Elements/MapDetail";

const Location = () => {
    return (
        <Section title="Alamat">
            <div className="flex gap-3 mt-4 flex-col">
               <Map />
               <MapDetail />
            </div>
        </Section>       
    )
}

export default Location;