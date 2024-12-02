import { MdMenu, MdMenuOpen } from "react-icons/md";
import { Helmet } from "react-helmet";
import Navigation from "../Admin/Navigation/Index";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLayout = ({ children, title = false }) => {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();
  const [hasLogin, setHasLogin] = useState(false);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isAdminLoggedIn") === "true";
    if (!isLoggedIn) {
      navigate("/admin/login"); // Redirect jika belum login
    } else {
      setHasLogin(true);
    }
  }, [navigate]);

  const navHandler = () => {
    setIsOpen(!isOpen);
  };

  return (
    hasLogin && (
      <div className="min-h-screen h-max">
        <Helmet>
          <title>{title ? title + " - " : ""}SIDUKAS Admin</title>
        </Helmet>
        <div className="flex bg-blue-500 text-white border-b-2 items-center print:hidden">
          <div className="w-64 flex justify-between p-4 pr-0 items-center">
            <div className="font-bold teext-3xl">SIDUKAS Admin</div>
            <div
              className="text-2xl hover:bg-blue-600 rounded-lg p-2"
              onClick={navHandler}
            >
              {isOpen ? <MdMenuOpen /> : <MdMenu />}
            </div>
          </div>
          <div className="text-2xl font-bold px-4">{title}</div>
        </div>
        <div className="relative">
          {isOpen && <Navigation />}
          <div className={`min-h-screen p-4 ${isOpen && "ml-64 print:ml-0"} `}>
            {children}
          </div>
        </div>
      </div>
    )
  );
};

export default AdminLayout;
