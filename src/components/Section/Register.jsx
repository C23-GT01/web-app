import React, { useEffect, useState } from "react";
import Button from "../Elements/Button";
import Alert from "../Elements/Alert";
import { register } from "../../services/user.service";
import Loading from "../Elements/Loading";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

const Register = ({ move }) => {
  const [user, setUser] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
    password2: "",
  });

  const [userError, setUserError] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
    password2: "",
  });

  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [openEye, setOpenEye] = useState(false);
  const [loading, setLoading] = useState(false);
  const [statusLoading, setStatusLoading] = useState("Memproses Data");

  const handleInput = (event) => {
    const { name, value } = event.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const validateField = (name, value) => {
    if (value.trim() === "") {
      return " ";
    }

    switch (name) {
      case "fullname":
        return value.length >= 4 ? "" : "Minimal 4 karakter";
      case "username":
        return value.length >= 5 ? "" : "Minimal 5 karakter";
      case "email":
        // eslint-disable-next-line no-case-declarations
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(value) ? "" : "Email tidak valid";
      case "password":
        return value.length >= 8 ? "" : "Minimal 8 karakter";
      case "password2":
        return value === user.password ? "" : "Konfirmasi password berbeda";
      default:
        return "";
    }
  };

  useEffect(() => {
    const errors = {};
    Object.keys(user).forEach((key) => {
      errors[key] = validateField(key, user[key]);
    });
    setUserError(errors);

    const hasErrors = Object.values(errors).some((error) => error !== "");
    setIsSubmitDisabled(hasErrors);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const fullname = user.fullname.trim();
    const username = user.username.trim();
    const email = user.email.trim();
    const password = user.password.trim();

    const userData = {
      fullname,
      username,
      email,
      password,
    };

    setLoading(true);
    register(userData, (res) => {
      if (res === true) {
        setStatusLoading("Registrasi Berhasil, Silahkan Login");
        setTimeout(() => {
          move("Login");
        }, 1500);
      } else {
        setStatusLoading(`Registrasi Gagal, ${res}`);
        setTimeout(() => {
          setLoading(false);
        }, 1500);
      }
    });
  };

  const handleOpenEye = () => {
    setOpenEye(!openEye);
  };

  return (
    <div className="w-full p-4 ">
      {!loading ? (
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 sm:grid-cols-2 gap-x-4"
        >
          <div className="sm:col-span-2 ">
            <label htmlFor="fullname" className="block font-semibold mb-1 ">
              Fullname
            </label>
            <input
              type="text"
              id="fullname"
              name="fullname"
              value={user.fullname}
              onChange={handleInput}
              className="w-full border rounded-md py-2 px-3"
              autoComplete="off"
              placeholder="Nama Anda"
              required
            />
            <Alert message={userError.fullname} />
          </div>
          <div className="mb-4">
            <label htmlFor="username" className="block font-semibold mb-1">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={user.username}
              onChange={handleInput}
              placeholder="Nama UMKM"
              className="w-full border rounded-md py-2 px-3"
              autoComplete="off"
              required
            />
            <Alert message={userError.username} />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block font-semibold mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={user.email}
              placeholder="Email UMKM"
              onChange={handleInput}
              className="w-full border rounded-md py-2 px-3"
              autoComplete="off"
              required
            />
            <Alert message={userError.email} />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block font-semibold mb-1">
              Password
            </label>
            <div className="relative ">
              <input
                type={openEye ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Kata sandi baru"
                value={user.password}
                onChange={handleInput}
                className="w-full border rounded-md py-2 px-3"
                autoComplete="off"
                required
              />
              <Button
                className={` absolute top-1/2 right-2 -translate-y-1/2 ${
                  user.password !== "" ? "" : "bg-[#BBB] hover:bg-[#BBB]"
                }`}
                onClick={handleOpenEye}
              >
                {openEye ? <IoMdEye /> : <IoMdEyeOff />}
              </Button>
            </div>
            <Alert message={userError.password} />
          </div>
          <div className="mb-4">
            <label htmlFor="password2" className="block font-semibold mb-1 ">
              Konfirmasi Password
            </label>
            <input
              type={openEye ? "text" : "password"}
              id="password2"
              name="password2"
              placeholder="Konfirmasi kata sandi"
              value={user.password2}
              onChange={handleInput}
              className="w-full border rounded-md py-2 px-3"
              autoComplete="off"
              required
            />
            <span className="text-red-500 text-sm font-thin">
              <Alert message={userError.password2} />
            </span>
          </div>
          <Button
            disabled={isSubmitDisabled}
            type="submit"
            className={`py-2 px-4 w-full mt-2  sm:col-span-2 ${
              isSubmitDisabled ? "bg-[#BBB] hover:bg-[#BBB]" : ""
            }`}
          >
            Register
          </Button>

          <h2
            onClick={move}
            className="text-sm text-[#BBB] font-inter mt-4 text-center hover:text-[#886345] sm:col-span-2"
          >
            Sudah Punya Akun? Login
          </h2>
        </form>
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

export default Register;
