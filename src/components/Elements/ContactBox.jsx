import { MdWhatsapp } from "react-icons/md";
import { MdPhone } from "react-icons/md";
import { MdMail } from "react-icons/md";
import { AiTwotoneMail } from "react-icons/ai";
import { IoIosCall } from "react-icons/io";
import Icon from "./Icon";


const ContactBox = ({ email='...', phone = false, wa = '...' }) => {
    return (
        <div className="sm:w-[500px] w-[300px] h-[30vh] item-center flex justify-center m-auto rounded-2xl font-inter items-center">
            <div className="flex">
                {
                    (phone) &&
                    <div className="flex gap-3 ml-6 mr-5">
                        <p><Icon className="text-5xl"><MdPhone /></Icon></p>
                        <h3>{phone}</h3>
                    </div>

                }
                {
                    (phone) &&
                    <div className="w-1 h-[10vh] bg-black"></div>
                }

                <div className="flex gap-3 ml-6 mr-5">
                    <p><Icon className="text-5xl"><MdWhatsapp /></Icon></p>
                    <h3>{wa}</h3>
                </div>
                <div className="w-1 h-[10vh] bg-black"></div>
                <div className="flex gap-3 ml-6 ">
                    <p><Icon className="text-5xl"><MdMail /></Icon></p>
                    <h3>{email}</h3>
                </div>
            </div>

        </div>
    );
}


export default ContactBox;