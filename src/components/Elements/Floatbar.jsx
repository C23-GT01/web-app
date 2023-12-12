import { MdSearch } from "react-icons/md";
import Nav from "./Nav";
import Icon from "./Icon";
import Brand from "./Brand";

const FLotbar = ({ bg = 'slate-400', openScan, showSearch, hidden = false, home = false, openLogin }) => {
  return (
    <div className={`h-[13.5 rem] bg-${bg} fixed w-full rounded-b-2xl px-auto py-4 md:py-10 xl:px-0 top-1 p-4 z-20 ${(hidden) ? 'hidden' : ''}`}>
      <div className="h-[80px] rounded-2xl max-w-[1240px] bg-white mx-auto left-0 right-0 flex items-center justify-between px-[16px] drop-shadow-xl  opacity-80">
        <Brand></Brand>
        <Icon hidden={showSearch} ><MdSearch /></Icon>
        <Nav openScan={openScan} home={home} openLogin={openLogin}> </Nav>

      </div>
    </div>
  );
};

export default FLotbar;