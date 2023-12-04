import { AiTwotoneMail } from "react-icons/ai";
import { GrInstagram } from "react-icons/gr";
import { IoIosCall } from "react-icons/io";


const ContactBox = () => {
    return (
        <div className="w-[500px] h-[30vh] item-center flex justify-center shadow-2xl m-auto rounded-2xl font-inter items-center">
            <div className="flex">
                <div className="flex gap-3 ml-6">
                    <p><icon className="text-5xl"><IoIosCall></IoIosCall></icon></p>
                    <h3>Phone: 08xxxxxxxx</h3>
                </div>
                <div className="w-1 h-[10vh] bg-black">

                </div>
                <div className="flex gap-3 ml-6 ">
                    <p><icon className="text-5xl"><AiTwotoneMail></AiTwotoneMail></icon></p>
                    <h3>Email: emailumkm@gmail.com</h3>
                </div>
            </div>

        </div>
    );
}


export default ContactBox;