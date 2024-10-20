import { SiShopee } from "react-icons/si";
import { MdWhatsapp } from "react-icons/md";
import tokopedia from "../../assets/img/logo/tokped.svg";

const OrderContactBox = ({
  wa = null,
  shopee = null,
  tokped = null,
}) => {
  return (
    <div className="flex flex-col sm:gap-x-6 sm:flex-row flex-wrap items-center mt-2">
      {wa && (
        <a
          href={`https://wa.me/${wa}?text=${encodeURIComponent("Halo, ")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-4 border-2 border-white hover:bg-slate-300 p-4 rounded-full"
        >
          <div className="text-green-500 text-4xl">
            <MdWhatsapp />
          </div>
        </a>
      )}
      {shopee && (
        <a
          href={shopee}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-4 border-2 border-white hover:bg-slate-300 p-4 rounded-full"
        >
          <div className="text-[#EE4D2D] text-3xl">
            <SiShopee />
          </div>
        </a>
      )}
      {tokped && (
        <a
          href={tokped}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-4 border-2 border-white hover:bg-slate-300 p-4 rounded-full"
        >
          <div className="text-blue-500 text-3xl">
            <img src={tokopedia} className="w-8" alt="" />
          </div>
        </a>
      )}
    </div>
  );
};

export default OrderContactBox;
