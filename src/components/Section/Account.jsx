import { MdDelete } from "react-icons/md";
import { FaHandHoldingHeart } from "react-icons/fa";
import { BsStack } from "react-icons/bs";
import { MdStore } from "react-icons/md";
import { MdAddBusiness } from "react-icons/md";
import { MdLogout } from "react-icons/md";
import { useEffect, useState } from "react";
import Loading from "../Elements/Loading";
import { Link, useNavigate } from "react-router-dom";
import Dashboard from "./Dashboard";
import ErrorPage from "../../pages/404";
import Icon from "../Elements/Icon";
import { getUserProfile } from "../../services/user.service";
import { logout } from "../../services/auth.service";
import { deleteUmkm, getUmkmByOwner } from "../../services/umkm.service";

const Account = ({ move, noClose, closeModal }) => {
  const [umkm, setUmkm] = useState("")
  const [hasUmkm, setHasUmkm] = useState("...");
  const [notLogin, setNotLogin] = useState(false);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [statusLoading, setStatusLoading] = useState("Load Data");
  const navigate = useNavigate();

  const handleSamePage = (url) => {
    if (window.location.pathname === url) {
      closeModal(false);
    }
  };

  useEffect(() => {
    setLoading(true);

    getUserProfile((data) => {
      if (data) {
        setProfile(data);
      } else {
        setNotLogin(true);
      }
    });

    getUmkmByOwner((data) => {
      if (data) {
        setUmkm(data)
        setHasUmkm(true);
      } else {
        setHasUmkm(false);
      }
    });
    setLoading(false);
  }, []);

  const handleDeleteUmkm = async () => {
    setLoading(true);
    setStatusLoading("Sedang Menghapus Umkm");
    const res = await deleteUmkm();
    console.log(res);
    if (res) {
      setStatusLoading("Umkm Berhasil");
    } else {
      setStatusLoading("Umkm Gagal Dihapus");
    }
    setTimeout(() => {
      setLoading(false);
      navigate("/");
    }, 700);
  };

  const handleLogout = async () => {
    noClose(true);
    setLoading(true);
    setStatusLoading("Sedang Logout");
    logout((res) => {
      if (res) {
        setStatusLoading("Logout Berhasil");
      } else {
        setStatusLoading("Anda Telah Logout");
      }
      setTimeout(() => {
        noClose(false);
        setLoading(false);
        move("Login");
        navigate("/");
      }, 700);
    });
  };

  if (notLogin) {
    return <ErrorPage />;
  }

  //

  return (
    <div className="w-full p-4 ">
      {!loading && profile && hasUmkm !== "..." ? (
        <div className="grid sm:grid-cols-2 gap-4 -mt-4">
          <Dashboard data={profile} umkm={hasUmkm} logoumkm={umkm.logo} />
          {hasUmkm ? (
            <>
              <Link
                to={"/umkm/profile"}
                onClick={() => handleSamePage("/umkm/profile")}
                className=" h-32 font-inter outline outline-slate-300 py-2 px-4 rounded-md mt-2 hover:scale-105 flex flex-col justify-around "
              >
                <Icon active>
                  <MdStore />
                </Icon>
                Manajemen UMKM
              </Link>
              <Link
                to={"/umkm/resource"}
                className=" h-32 font-inter outline outline-slate-300 py-2 px-4 rounded-md mt-2 hover:scale-105 flex flex-col justify-around "
              >
                <Icon active>
                  <BsStack />
                </Icon>
                Manajemen Bahan Baku
              </Link>
              <Link
                to={"/umkm/impact"}
                className=" h-32 font-inter outline outline-slate-300 py-2 px-4 rounded-md mt-2 hover:scale-105 flex flex-col justify-around "
              >
                <Icon active>
                  <FaHandHoldingHeart />
                </Icon>
                Manajemen Impact
              </Link>

              <div
                className="h-32 font-inter outline outline-red-500 py-2 px-4 rounded-md mt-2 hover:scale-105 flex flex-col justify-around "
                onClick={handleDeleteUmkm}
              >
                <Icon active>
                  <MdDelete />
                </Icon>
                Hapus UMKM
              </div>
            </>
          ) : (
            <div
              onClick={() => move("Registrasi UMKM")}
              className=" h-32 font-inter outline outline-slate-300 py-2 px-4 rounded-md mt-2 hover:scale-105 flex flex-col justify-around "
            >
              <Icon active>
                <MdAddBusiness />
              </Icon>
              Daftarkan UMKM
            </div>
          )}

          <div
            className="h-32 font-inter outline outline-slate-300 py-2 px-4 rounded-md mt-2 hover:scale-105 flex flex-col justify-around "
            onClick={handleLogout}
          >
            <Icon active>
              <MdLogout />
            </Icon>
            Logout
          </div>
        </div>
      ) : (
        <div className="loading-indicator">
          <Loading />
          <h1 className="text-sm font-inter mt-1 text-center">
            {statusLoading}
          </h1>
        </div>
      )}
    </div>
  );
};

export default Account;
