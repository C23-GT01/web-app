/* eslint-disable no-undef */
import axios from "axios";
import accessToken from "../utils/accesToken";
const Endpoint = process.env.BE_ENDPOINT;

export const getUserProfile = async (callback) => {
  const token = await accessToken();
  let config = {};

  if (token) {
    config.headers = {
      Authorization: `Bearer ${token}`,
    };
  } else {
    callback(false);
  }
  axios
    .get(`${Endpoint}/user/profile`, config)
    .then((res) => {
      callback(res.data.data.user);
    })
    .catch((err) => {
      console.log(err);
      callback([]);
    });
};

export const register = (data, callback) => {
  axios
    .post(`${Endpoint}/user`, data)
    .then((res) => {
      console.log(res);
      callback(true);
    })
    .catch((err) => {
      console.log(err);
      callback(err.response.data.message);
    });
}