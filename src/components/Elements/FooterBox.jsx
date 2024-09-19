import logo from "../../assets/img/tr-logo.png";

const FooterBox = () => {
  return (
    // <>
    //   <div className="m-auto flex justify-center items-center pt-[70px]">
    //     <img src={logo} alt="" className="w-11 mr-1" />
    //     <h1 className="text-3xl text-white">TrackMate</h1>
    //   </div>
    //   <div className="text-white text-center my-2">
    //     <p>Copyright &copy; TrackMate 2024</p>
    //   </div>
    //   <div className="text-left sm:mt-8 sm:mb-4 text-white font-inter grid grid-cols-3 max-w-2xl mx-auto gap-y-2 sm:translate-x-16 p-8 sm:p-0 text-xs sm:text-sm">
    //   </div>
    //   <div className="flex max-w-xl text-s"></div>
    // </>
    <div className="flex flex-col">
      <div className="h-28 flex justify-between p-4 flex-1 text-white">
        <div className="uppercase min-h-36">Hubungi Kami</div>
        <div className="uppercase min-h-36">Kunjungan</div>
        <div className="uppercase min-h-36">Media Sosial</div>
      </div>
      <div className="text-center text-white mb-2">&copy; 2024 Dinas Koperasi, Usah Kecil dan Menengah Kab. Sigi</div>
    </div>
  );
};

export default FooterBox;
