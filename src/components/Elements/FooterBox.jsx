import { MdLocationOn } from "react-icons/md";
import { IoMdGlobe } from "react-icons/io";
import { MdMail } from "react-icons/md";
import { AiOutlineInstagram } from "react-icons/ai";
import { MdFacebook } from "react-icons/md";
import logo from "../../assets/img/tr-logo.png";

const FooterBox = () => {
  return (
    <div className="flex flex-col ">
      <div className="h-28 flex justify-between p-10 pb-8 flex-1 text-white flex-wrap gap-y-7">
        {/* <div className="">
          <img src={logo} alt="" className="w-32 h-32" />
        </div> */}
        <div className="">
          <div className="uppercase font-medium mb-4">Hubungi Kami</div>
          <div className="flex flex-col gap-2">
            <a
              href={`/`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <div className="text-white text-2xl">
                <MdLocationOn />
              </div>
              <div className="text-inter">
                Jalan Trans Palu-Kulawi, Desa Maku, Kec. Dolo, Kab. Sigi 94361
              </div>
            </a>
            <a
              href={`mailto:dis.kumkm.sigi@gmail.com`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <div className="text-white text-2xl">
                <MdMail />
              </div>
              <div className="text-inter">dis.kumkm.sigi@gmail.com</div>
            </a>
            <a
              href="https://dinaskoperasiumkmsigi.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <div className="text-white text-2xl">
                <IoMdGlobe />
              </div>
              <div className="text-inter">
                https://dinaskoperasiumkmsigi.com
              </div>
            </a>
          </div>
        </div>
        <div className="">
          <div className="uppercase font-medium mb-4">Sosial Media</div>
          <div className="flex flex-col gap-2">
            <a
              href={`facebook.com/dinaskumkmsigi`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <div className="text-white text-2xl">
                <MdFacebook />
              </div>
              <div className="text-inter">dinaskumkmsigi</div>
            </a>
            <a
              href={`instagram.com/dinaskumkmsigi`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <div className="text-white text-2xl">
                <AiOutlineInstagram />
              </div>
              <div className="text-inter">@dinaskumkmsigi</div>
            </a>
          </div>
        </div>
      </div>
      <div className="text-center text-white mb-2">
        &copy; 2024 Dinas Koperasi, Usah Kecil dan Menengah Kab. Sigi
      </div>
    </div>
  );
};

export default FooterBox;
