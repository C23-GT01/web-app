import { MdCheck } from "react-icons/md";
import { IoMdAlert } from "react-icons/io";

const Alert = ({ message = "" }) => {
  return (
    <span
      className={`text-sm font-thin flex items-center gap-2 mt-2 justify-end ${
        message !== "" ? "text-red-500" : "text-green-500"
      }`}
    >
      {message !== "" ? (
        <>
          {message} <IoMdAlert />
        </>
      ) : (
        <MdCheck />
      )}
    </span>
  );
};

export default Alert;
