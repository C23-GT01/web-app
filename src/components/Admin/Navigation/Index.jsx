import { MdDashboard, MdInventory, MdLogout } from "react-icons/md";
import NavLink from "./NavLink";
import { BsShop } from "react-icons/bs";
import { useLocation, useNavigate } from "react-router-dom";

export default function Navigation() {
  const router = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isAdminLoggedIn"); // Hapus status login
    navigate("/admin/login"); // Redirect ke halaman login
  };

  return (
    <nav className="absolute top-0 left-0 h-screen w-64 bg-blue-500 p-4 text-white print:opacity-0">
      <div className="flex flex-col my-6 gap-2">
        <NavLink
          active={router.pathname === "/dashboard"}
          href="/dashboard"
          icon={<MdDashboard />}
          text="Dashboard"
        />
        <NavLink
          href="/admin/umkm"
          active={router.pathname === "/admin/umkm"}
          icon={<BsShop />}
          text="UMKM"
        />
        <NavLink
          active={router.pathname === "/admin/product"}
          href="/admin/product"
          icon={<MdInventory />}
          text="Product"
        />
        {/* <NavLink active={router.pathname === "/admin/report"} href="/admin/report" icon={<MdPrint />} text="Laporan" /> */}
      </div>
      <button
        onClick={handleLogout}
        className="px-4 py-2 rounded-xl flex gap-4 items-center hover:bg-blue-600 w-full"
      >
        <MdLogout /> Logout
      </button>
    </nav>
  );
}
