import { MdSearch } from "react-icons/md";
import Icon from "./Icon";
import { useState } from "react";

const Search = () => {
  const [isActive, setIsActive] = useState(false);

  const handleInputFocus = () => {
    setIsActive(true);
  };

  const handleInputBlur = () => {
    setIsActive(false);
  };

  return (
    <div className="absolute top-0 w-full h-full flex justify-center items-center px-4">
      <div className="h-14 w-full max-w-[500px] bg-white rounded-2xl translate-y-14 opacity-90 flex items-center xl:mx-0 px-2 m-12">
        <Icon active={isActive}><MdSearch /></Icon>
        <input
          type="text"
          className="w-80 h-8 outline-none gap-2 font-semibold text-xl placeholder:font-semibold placeholder:text-lg md:placeholder:text-xl font-inter"
          placeholder="Temukan produk lokal unggulan"
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
        />
      </div>
    </div>
  );
};

export default Search;