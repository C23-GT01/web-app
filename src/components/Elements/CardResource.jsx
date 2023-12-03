import { MdLocationOn } from "react-icons/md";
import { MdShoppingBag } from "react-icons/md";
import Icon from "./Icon";

const CardResource = ({ src }) => {
    return (
            <div className="flex flex-col">
                <img src={src} className="w-72 h-48 object-cover block rounded-2xl drop-shadow-xl mb-1" alt="img" />
                <div className="w-64 pt-4">
                    <h1 className="font-inter text-xl mb-2">Ervan</h1>
                    <p className="mb-2">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quis recusandae fuga beatae eveniet libero natus? Ullam quasi eius, repellendus, saepe dolor alias velit voluptatem, voluptate tempore harum rem itaque dicta.</p>
                    <div>
                        <p className="flex gap-2 items-center font-bold mb-2 mt-4">
                            <Icon size="h-[37x] w-[37px]" active={true}><MdShoppingBag /></Icon>
                            Sambal Mamo
                        </p>
                        <p className="flex gap-2 items-center font-bold">
                            <Icon size="h-[37px] w-[37px]" active={true}><MdLocationOn /></Icon>
                            Wonogiri, Jawa Tengah
                        </p>
                    </div>
                </div>
            </div>
    );
};

export default CardResource;