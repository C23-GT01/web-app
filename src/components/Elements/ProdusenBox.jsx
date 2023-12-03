import { MdLocationOn } from "react-icons/md";
import { MdPeople } from "react-icons/md";
import Icon from "./Icon";

const ProdusenBox = ({ src }) => {
    return (
        <div className="flex items-center gap-8 justify-center">
            <img src={src} className="rounded-full w-32 md:w-48" alt="" />
            <div className="flex flex-col gap-2">
                <h1 className="font-inter text-xl">Sambal Mamo</h1>
                <p className="flex gap-2 items-center font-bold ">
                    <Icon size="h-[37x] w-[37px]" active={true}><MdPeople /></Icon>
                    1000 karyawan
                </p>
                <p className="flex gap-2 items-center font-bold ">
                    <Icon size="h-[37x] w-[37px]" active={true}><MdLocationOn /></Icon>
                    Denpasar, Bali
                </p>
            </div>
        </div>
    )
}

export default ProdusenBox;