import { MdSearch } from "react-icons/md";
import Icon from "./Icon";
import { useState } from "react";
import Button, { ButtonLink } from "./Button";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [isActive, setIsActive] = useState(false);
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setKeyword(event.target.value);
  };

  const handleInputFocus = () => {
    setIsActive(true);
  };

  const handleInputBlur = () => {
    setIsActive(false);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && keyword !== "") {
      navigate(`/search/${keyword}`);
    }
  };

  return (
    <div className="absolute top-0 w-full h-full flex justify-center items-center px-4">
      <div className="gap-2 h-14 w-full max-w-[500px] bg-white rounded-2xl translate-y-14 opacity-90 flex justify-between items-center xl:mx-0 px-2 m-12">
        <Icon active={isActive || keyword !== ""}>
          <MdSearch />
        </Icon>
        <input
          type="text"
          className="w-full h-8 outline-none gap-2 font-semibold text-xl placeholder:font-semibold placeholder:text-lg md:placeholder:text-xl font-inter"
          placeholder="Temukan produk lokal unggulan"
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
        />

        <ButtonLink
          href={`/search/${keyword}`}
          className={keyword === "" ? "hidden" : ""}
        >
          Cari
        </ButtonLink>
      </div>
    </div>
  );
};

export default Search;
