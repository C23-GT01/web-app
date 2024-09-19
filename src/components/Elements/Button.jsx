import { Link } from "react-router-dom";

const Button = ({
  children = "...",
  className = "",
  type = "button",
  onClick,
  disabled = false,
}) => {
  return (
    <button
      disabled={disabled}
      type={type}
      onClick={onClick}
      className={`px-4 py-2   hover:text-[#fff] ${
        disabled ? "bg-[#444444] text-[#fff]" : "bg-[#fff500] text-[#444444] hover:bg-[#999999]"
      }  ${className} rounded-lg`}
    >
      {children}
    </button>
  );
};

export default Button;

export const ButtonLink = ({
  href = "#",
  children = "...",
  className = "",
}) => {
  return (
    <Link to={href}>
      <Button className={className}>{children}</Button>
    </Link>
  );
};
