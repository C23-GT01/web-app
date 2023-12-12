import placeholder from '../../assets/img/placeholder.jpg'
import { LazyLoadImage } from "react-lazy-load-image-component";
import { MdDelete, MdEdit, MdLocationOn } from "react-icons/md";
import { MdShoppingBag } from "react-icons/md";
import Icon from "./Icon";
import { Link, useNavigate } from "react-router-dom";
import accessToken from "../../utils/accesToken";
import { useState } from "react";
import axios from "axios";


const CardImpact = ({ src, description = '...', name = '...', edited = false, id }) => {
    const navigate = useNavigate();
    const [loadingDelete, setLoadingDelete] = useState(false);

    const deleteImpactHandle = async (event, id) => {
        event.stopPropagation();
        const confirmDelete = window.confirm('Apakah Anda yakin ingin menghapus impact ini?');
        if (confirmDelete) {
            setLoadingDelete(true);
            try {
                const token = await accessToken();
                if (token) {
                    const config = {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    };
                    const response = await axios.delete(`http://c23-gt01-01.et.r.appspot.com/impacts/${id}`, config);
                    alert(response.data.message);
                    setLoadingDelete(false);
                }
            } catch (error) {
                console.error('Error deleting product:', error);
            } finally {
                navigate(0);
            }
        }
    };
    return (
        <div className="flex flex-col w-min-64 drop-shadow-xl bg-white rounded-2xl">
            <LazyLoadImage src={src} placeholderSrc={placeholder} className="w-full  h-48 object-cover block rounded-2xl  mb-1" alt="img" />
            {
                (edited) &&

                <div className='w-full justify-end flex gap-2 py-2 px-2' >
                    <Link to={`/product/edit`} >
                        <Icon size="w-6 h-6" ><MdEdit /></Icon></Link>
                    <Icon size="w-6 h-6" ><MdDelete onClick={(event) => deleteImpactHandle(event, id)} /></Icon>
                </div>
            }
            <div className="pt-4 p-4">
                <h1 className="font-inter text-xl mb-2">{name}</h1>
                <p className="mb-2">{description}</p>
            </div>
        </div>
    );
};

export default CardImpact;