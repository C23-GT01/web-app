import HomeLayout from "../components/Layouts/HomeLayouts";
import React, { useState, useEffect } from "react";
import Resources from "../components/Section/Resources";
import ErrorPage from "./404";
import { getResourceBySlugUmkm } from "../services/resource.service";
import { getUmkmByOwner } from "../services/umkm.service";

const ResourcePage = () => {
  const [resources, setResources] = useState(null);
  const [isNotFound, setNotFound] = useState(false);
  const [umkm, setUmkm] = useState({});

  const refresh = () => {
    getResourceBySlugUmkm(umkm.slug, (data) => {
      if (data) {
        setResources({ resource: data });
      } else {
        setNotFound(true);
      }
    });
  };

  useEffect(() => {
    getUmkmByOwner((data) => {
      if (data) {
        setUmkm(data);
        getResourceBySlugUmkm(data.slug, (data) => {
          if (data) {
            setResources({ resource: data });
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
      {resources ? (
        <HomeLayout title={"Resources"} nodiv>
          <div className="mt-32">
            <Resources
              product={resources}
              title="Manajemen Bahan Baku"
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

export default ResourcePage;
