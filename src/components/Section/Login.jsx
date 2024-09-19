import { IoMdEyeOff } from "react-icons/io";
import { IoMdEye } from "react-icons/io";
import React, { useState } from "react";
import { login } from "../../services/auth.service";
import Loading from "../Elements/Loading";
import Button from "../Elements/Button";

const Login = ({ move, close }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isFilled, setIsFilled] = useState(false);
  const [openEye, setOpenEye] = useState(false);
  const [statusLoading, setStatusLoading] = useState("Sedang Login");

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
    checkIsFilled(event.target.value, password);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    checkIsFilled(username, event.target.value);
  };

  const checkIsFilled = (usernameValue, passwordValue) => {
    if (usernameValue.trim() !== "" && passwordValue.trim() !== "") {
      setIsFilled(true);
    } else {
      setIsFilled(false);
    }
  };

  const [loading, setLoading] = useState(false);

  const handleOpenEye = () => {
    setOpenEye(!openEye);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    close(true);

    const loginData = {
      username,
      password,
    };

    login(loginData, (res) => {
      if (res) {
        setStatusLoading("Login berhasil");
        setTimeout(() => {
          close(false);
          setLoading(false);
          move("Account");
        }, 700);
      } else {
        setStatusLoading("Username / Password Salah");
        setTimeout(() => {
          close(false);
          setLoading(false);
          setStatusLoading("Sedang Login");
        }, 1500);
      }
    });
  };

  return (
    <div className="w-full mx-auto p-4">
      {loading ? (
        <div className="loading-indicator">
          <Loading />
          <h1 className="text-sm font-inter mt-1 text-center">
            {statusLoading}
          </h1>
        </div>
      ) : (
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="username" className="block font-semibold mb-1">
              Username
            </label>
            <input
              type="text"
              id="username"
              placeholder="Nama UMKM"
              value={username}
              onChange={handleUsernameChange}
              className="w-full border rounded-md py-2 px-3"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block font-semibold mb-1">
              Password
            </label>
            <div className="flex gap-2">
              <input
                type={openEye ? "text" : "password"}
                id="password"
                placeholder="Kata sandi"
                value={password}
                onChange={handlePasswordChange}
                className="w-full border rounded-md py-2 px-3"
                required
              />
              <Button
                className={` ${
                  password !== "" ? "" : "bg-[#BBB] hover:bg-[#BBB]"
                }`}
                onClick={handleOpenEye}
              >
                {openEye ? <IoMdEye /> : <IoMdEyeOff />}
              </Button>
            </div>
          </div>
          <Button
            disabled={!isFilled}
            type="submit"
            className={`py-2 px-4 w-full mt-2  sm:col-span-2`}
          >
            Konfirmasi
          </Button>

          <h2
            onClick={() => move("Register")}
            className="text-sm text-[#BBB]  font-inter mt-4 text-center hover:text-[#886345]"
          >
            Belum punya akun? Daftar
          </h2>
        </form>
      )}
    </div>
  );
};

export default Login;
