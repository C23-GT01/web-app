import { MdFeedback } from "react-icons/md";
import { MdInfo } from "react-icons/md";
const FilterItem = ({ children, logo }) => {
  return (
    <>
      <div
        className="flex flex-col items-center gap-2 w-[100px]"
        onClick={() => {}}
      >
        <div className="rounded-full w-[100px] h-[100px] bg-[#0093dd] text-white p-8">
          {logo}
        </div>
        <h3 className="font-inter font-semibold w-full text-center">
          {children}
        </h3>
      </div>
    </>
  );
};

export default FilterItem;
