import HomeLayout from "../components/Layouts/HomeLayouts";
import React, { useState, useEffect } from "react";
import Impact from "../components/Section/Impact";
import ErrorPage from "./404";
import { getUmkmByOwner } from "../services/umkm.service";
import { getImpactBySlugUmkm } from "../services/impact.service";

const ImpactPage = () => {
  const [impacts, setImpacts] = useState(null);
  const [isNotFound, setNotFound] = useState(false);
  const [umkm, setUmkm] = useState({});

  const refresh = () => {
    getImpactBySlugUmkm(umkm.slug, (data) => {
      if (data) {
        setImpacts({ impact: data });
      } else {
        setNotFound(true);
      }
    });
  };

  useEffect(() => {
    getUmkmByOwner((data) => {
      if (data) {
        setUmkm(data);
        getImpactBySlugUmkm(data.slug, (data) => {
          if (data) {
            setImpacts({ impact: data });
          } else {
            setNotFound(true);
          }
        });
      } else {
        setNotFound(true);
      }
    });
  }, []);

  if (isNotFound) {
    return <ErrorPage />;
  }

  return (
    <>
      {impacts ? (
        <HomeLayout title={"Resources"} nodiv>
          <div className="mt-32">
            <Impact
              product={impacts}
              name="Manajemen Impact"
              edited
              style="flex gap-4 gap-y-8 flex-wrap justify-around mt-10"
              refreshProduct={refresh}
            />
          </div>
        </HomeLayout>
      ) : (
        ""
      )}
    </>
  );
};

export default ImpactPage;
