import { AiTwotoneMail } from "react-icons/ai";
import { IoIosCall } from "react-icons/io";
import Icon from "./Icon";


const ContactBox = () => {
    return (
        <div className="sm:w-[500px] w-[300px] h-[30vh] item-center flex justify-center m-auto rounded-2xl font-inter items-center">
            <div className="flex">
                <div className="flex gap-3 ml-6 mr-5">
                    <p><Icon className="text-5xl"><IoIosCall></IoIosCall></Icon></p>
                    <h3>Phone: 08xxxxxxxx</h3>
                </div>
                <div className="w-1 h-[10vh] bg-black">

                </div>
                <div className="flex gap-3 ml-6 ">
                    <p><Icon className="text-5xl"><AiTwotoneMail></AiTwotoneMail></Icon></p>
                    <h3>Email: emailumkm@gmail.com</h3>
                </div>
            </div>

        </div>
    );
}


export default ContactBox;