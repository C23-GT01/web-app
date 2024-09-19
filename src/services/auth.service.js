import axios from "axios";
import Cookies from "js-cookie";
// eslint-disable-next-line no-undef
const Endpoint = process.env.BE_ENDPOINT;

export const login = (loginData, callback) => {
  axios
    .post(`${Endpoint}/authentications`, loginData)
    .then((res) => {
      console.log("Debug[Auth]: Login Succes");
      const accessToken = res.data.data.accessToken;
      const refreshToken = res.data.data.refreshToken;

      const refreshTokenExpires = new Date();
      refreshTokenExpires.setDate(refreshTokenExpires.getDate() + 7);

      const accessTokenExpires = new Date();
      accessTokenExpires.setSeconds(accessTokenExpires.getSeconds() + 100);

      Cookies.set("refreshToken", refreshToken, {
        expires: refreshTokenExpires,
      });
      Cookies.set("accessToken", accessToken, {
        expires: accessTokenExpires,
      });

      callback(true);
    })
    .catch((err) => {
      console.log(err.message);
      callback(false);
    });
};

export const logout = (callback) => {
  const refreshToken = Cookies.get("refreshToken");
  Cookies.remove("refreshToken");
  Cookies.remove("accessToken");

  axios
    .delete(`${Endpoint}/authentications`, {
      data: { token: refreshToken },
    })
    .then(() => {
      callback(true);
    })
    .catch((err) => {
      console.log(err);
      callback(false);
    });
};
