import HomeLayout from "../components/Layouts/HomeLayouts";
import { useParams } from "react-router-dom";
import UmkmImage from "../components/Elements/UmkmImage";
import UmkmSummary from "../components/Elements/UmkmSummary";
import Products from "../components/Section/Products";
import Location from "../components/Section/Location";
import History from "../components/Section/History";
import Impact from "../components/Section/Impact";
import ContactUs from "../components/Section/ContactUs";
import Loading from "../components/Elements/Loading";
import { getUmkm } from "../services/umkm.service";
import { useEffect, useState } from "react";
import ErrorPage from "./404";
import { getImpactBySlugUmkm } from "../services/impact.service";

const UmkmPage = () => {
  const { id } = useParams();
  const [umkm, setUmkm] = useState(null);
  const [isNotFound, setNotFound] = useState(false);
  const [impacts, setImpacts] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      getUmkm(id, (data) => {
        if (data) {
          console.log(data.history);
          setUmkm(data);
          getImpactBySlugUmkm(data.slug, (data) => {
            if (data) {
              setImpacts({ impact: data });
            }
          });
        } else {
          setNotFound(true);
        }
      });
    }, 700);
  }, [id]);

  if (isNotFound) {
    return <ErrorPage />;
  }

  return (
    <>
      {umkm && impacts !== null ? (
        <HomeLayout title={umkm.name}>
          <UmkmImage src={umkm.images} />
          <UmkmSummary
            data={umkm}
            logo={umkm.logo}
            name={umkm.name}
            description={umkm.description}
          />
          <Products name="Produk" data={umkm.products} />
          <Location data={umkm} />
          {umkm.history !== null && <History data={umkm} />}
          {impacts.impact.length > 0 && (
            <Impact name="UMKM Impact" product={impacts} />
          )}
          <ContactUs data={umkm}  />
        </HomeLayout>
      ) : (
        <div className="h-screen w-screen flex justify-center items-center">
          <Loading />
        </div>
      )}
    </>
  );
};

export default UmkmPage;
