import { MdAssignmentAdd } from "react-icons/md";
import { MdQuestionAnswer } from "react-icons/md";
import { IoMdClipboard } from "react-icons/io";
import { MdInfo } from "react-icons/md";
import FilterItem from "../Elements/FilterItem";
import CategoryImage from "../../assets/img/categoryAll.png";
import Agrikultur from "../../assets/img/agricultur.png";
import MakananImage from "../../assets/img/makanan.png";
import MinumanImage from "../../assets/img/minuman.png";
import { MdFeedback } from "react-icons/md";

const FIlter = () => {
  return (
    <div className="w-full bg-white">
      <div className="flex gap-10 max-w-[1240px] mx-auto  xl:px-0  p-4">
        <FilterItem logo={<MdInfo className="w-full h-full " />}>
          About
        </FilterItem>
        <FilterItem logo={<MdAssignmentAdd className="w-full h-full " />}>
          Pengajuan
        </FilterItem>
        <FilterItem logo={<MdQuestionAnswer className="w-full h-full " />}>
          FAQ
        </FilterItem>
      </div>
    </div>
  );
};

export default FIlter;
