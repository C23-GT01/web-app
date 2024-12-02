import { Link } from "react-router-dom";

export default function NavLink({ href, icon, text, active = false }) {
  return (
    <Link to={href} className={`${active ? "bg-blue-600" : "bg-blue-500"} px-4 py-2 rounded-xl flex gap-4 items-center hover:bg-blue-600 `}>
      {icon}
      <h2 className="font-semibold">{text}</h2>
    </Link>
  );
}
