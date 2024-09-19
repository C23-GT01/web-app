import { SiShopee } from "react-icons/si";
import { MdPhone } from "react-icons/md";
import { AiOutlineInstagram } from "react-icons/ai";
import { MdFacebook } from "react-icons/md";
import { BiLinkExternal } from "react-icons/bi";
import { MdWhatsapp } from "react-icons/md";
import { MdMail } from "react-icons/md";
import tokopedia from "../../assets/img/logo/tokped.svg";

const ContactBox = ({
  email = null,
  phone = null,
  wa = null,
  shopee = null,
  tokped = null,
  fb = null,
  ig = null,
}) => {
  return (
    <div className="flex flex-col sm:gap-x-6 sm:justify-center sm:flex-row flex-wrap items-center mt-6">
      {wa && (
        <a
          href={`https://wa.me/${wa}?text=${encodeURIComponent("Halo, ")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-4 border-2 border-white hover:border-[#dc0000] p-4 rounded-xl"
        >
          <div className="text-green-500 text-4xl">
            <MdWhatsapp />
          </div>
          <div className="text-inter font-medium text-xl">{wa}</div>
          <div className="text-xl">
            <BiLinkExternal />
          </div>
        </a>
      )}
      {shopee && (
        <a
          href={shopee.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-4 border-2 border-white hover:border-[#dc0000] p-4 rounded-xl"
        >
          <div className="text-[#EE4D2D] text-3xl">
            <SiShopee />
          </div>
          <div className="text-inter font-medium text-xl">{shopee.name}</div>
          <div className="text-xl">
            <BiLinkExternal />
          </div>
        </a>
      )}
      {tokped && (
        <a
          href={tokped.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-4 border-2 border-white hover:border-[#dc0000] p-4 rounded-xl"
        >
          <div className="text-blue-500 text-3xl">
            <img src={tokopedia} className="w-8" alt="" />
          </div>
          <div className="text-inter font-medium text-xl">{tokped.name}</div>
          <div className="text-xl">
            <BiLinkExternal />
          </div>
        </a>
      )}
      {fb && (
        <a
          href={fb.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-4 border-2 border-white hover:border-[#dc0000] p-4 rounded-xl"
        >
          <div className="text-blue-500 text-4xl">
            <MdFacebook />
          </div>
          <div className="text-inter font-medium text-xl">{fb.name}</div>
          <div className="text-xl">
            <BiLinkExternal />
          </div>
        </a>
      )}
      {ig && (
        <a
          href={ig.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-4 border-2 border-white hover:border-[#dc0000] p-4 rounded-xl"
        >
          <div className="text-2xl bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 p-1 rounded-full">
            <AiOutlineInstagram className="text-white" />
          </div>
          <div className="text-inter font-medium text-xl">{ig.name}</div>
          <div className="text-xl">
            <BiLinkExternal />
          </div>
        </a>
      )}

      {email && (
        <a
          href={`mailto:${email}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-4 border-2 border-white hover:border-[#dc0000] p-4 rounded-xl"
        >
          <div className="text-red-500 text-4xl">
            <MdMail />
          </div>
          <div className="text-inter font-medium text-xl">{email}</div>
          <div className="text-xl">
            <BiLinkExternal />
          </div>
        </a>
      )}
      {phone && (
        <a
          href={`tel:${phone}`}
          className="flex items-center gap-4 border-2 border-white hover:border-[#dc0000] p-4 rounded-xl"
        >
          <div className="text-yellow-300 text-4xl">
            <MdPhone />
          </div>
          <div className="text-inter font-medium text-xl">{phone}</div>
          <div className="text-xl">
            <BiLinkExternal />
          </div>
        </a>
      )}
    </div>
  );
};

export default ContactBox;
