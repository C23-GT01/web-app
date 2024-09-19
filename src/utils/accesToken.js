/* eslint-disable no-undef */
import Cookies from "js-cookie";
import axios from "axios";
const Endpoint = process.env.BE_ENDPOINT;

const accessToken = async () => {
  const accessToken = Cookies.get("accessToken");
  if (accessToken) {
    return accessToken;
  }
  const refreshToken = Cookies.get("refreshToken");
  if (!refreshToken) {
    return false;
  }
  try {
    const response = await axios({
      method: "put",
      url: `${Endpoint}/authentications`,
      data: { token: `${refreshToken}` },
    });
    const newAccessToken = response.data.data.accessToken;
    const accessTokenExpires = new Date();
    accessTokenExpires.setSeconds(accessTokenExpires.getSeconds() + 100);
    Cookies.set("accessToken", newAccessToken, { expires: accessTokenExpires });
    return newAccessToken; // Mengembalikan newAccessToken setelah memperbarui
  } catch (error) {
    console.error("Error while refreshing token:", error);
    // Handle any error that occurred during token refresh
    throw error; // Melempar error jika terjadi kesalahan pada saat pembaruan token
  }
};

export default accessToken;
