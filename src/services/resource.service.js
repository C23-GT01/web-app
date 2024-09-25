/* eslint-disable no-undef */
import axios from "axios";
import accessToken from "../utils/accesToken";
const Endpoint = process.env.BE_ENDPOINT;

export const getResourceBySlugUmkm = (slug, callback) => {
  axios
    .get(`${process.env.BE_ENDPOINT}/resource/${slug}?type=umkm`)
    .then((res) => {
      callback(res.data.data);
    })
    .catch((err) => {
      console.log(err);
      callback(false);
    });
};

export const addResource = async (data) => {
  const token = await accessToken();
  let config = {};
  if (token) {
    config.headers = {
      Authorization: `Bearer ${token}`,
    };
  } else {
    return false;
  }
  try {
    const res = await axios.post(`${Endpoint}/resource`, data, config);
    console.log(res);
    return res.data;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const editResource = async (slug, data) => {
  const token = await accessToken();
  let config = {};
  if (token) {
    config.headers = {
      Authorization: `Bearer ${token}`,
    };
  } else {
    return false;
  }
  try {
    const res = await axios.put(`${Endpoint}/resource/${slug}`, data, config);
    console.log(res);
    return res.data;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const deleteResource = async (slug) => {
  const token = await accessToken();
  let config = {};
  if (token) {
    config.headers = {
      Authorization: `Bearer ${token}`,
    };
  } else {
    return false;
  }
  try {
    const res = await axios.delete(`${Endpoint}/resource/${slug}`, config);
    return res.data;
  } catch (error) {
    console.log(error);
    return false;
  }
};
