import CardUmkm from "../../Elements/CardUmkm";
import Pagination from "../../Elements/Pagination";
import Section from "../Index";

const Umkm = ({ data, pagination = false, lastPage = 1, page = 0 }) => {
  return (
    <Section title="UMKM Partner">
      <div className="flex gap-x-8 gap-y-16 flex-wrap mt-4 mb-16 ">
        {data && data.length > 0 ? (
          data.map((umkm, index) => <CardUmkm key={index} {...umkm} />)
        ) : (
          <p className="menu-list__empty">Not Found</p>
        )}
      </div>
      {pagination && <Pagination useAt="umkm" currentPage={page} lastPage={lastPage} />}
    </Section>
  );
};

export default Umkm;
