import { ImLeaf } from "react-icons/im";
import Icon from "./Icon";

const CardSummary = ({ children = "...", icon = <ImLeaf /> }) => {
    return (
        <p className="flex gap-2 items-center font-bold ">
            <Icon size="h-[37x] w-[37px]" active={true}>{icon}</Icon>
            {children}
        </p>
    );
};

export default CardSummary;