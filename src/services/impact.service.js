/* eslint-disable no-undef */
import axios from "axios";
import accessToken from "../utils/accesToken";
const Endpoint = process.env.BE_ENDPOINT;

export const getImpactBySlugUmkm = (slug, callback) => {
  axios
    .get(`${process.env.BE_ENDPOINT}/impact/${slug}?type=umkm`)
    .then((res) => {
      callback(res.data.data);
    })
    .catch((err) => {
      console.log(err);
      callback(false);
    });
};



export const addImpact = async (data) => {
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
    const res = await axios.post(`${Endpoint}/impact`, data, config);
    console.log(res);
    return res.data;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const editImpact = async (slug,data) => {
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
    const res = await axios.put(`${Endpoint}/impact/${slug}`, data, config);
    console.log(res);
    return res.data;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const deleteImpact = async (slug) => {
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
    const res = await axios.delete(`${Endpoint}/impact/${slug}`, config);
    return res.data;
  } catch (error) {
    console.log(error);
    return false;
  }
};
