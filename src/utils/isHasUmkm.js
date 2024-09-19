import { getUmkmByOwner } from "../services/umkm.service";

const isHasUmkm =  () => {
  getUmkmByOwner((data) => {
    if (data) {
      return true;
    } else {
      return false;
    }
  });
};

export default isHasUmkm;
