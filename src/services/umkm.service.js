/* eslint-disable no-undef */
import axios from "axios";
import accessToken from "../utils/accesToken";
const Endpoint = process.env.BE_ENDPOINT;

export const getAllUmkm = (callback) => {
  axios
    .get(`${Endpoint}/umkm`)
    .then((res) => {
      callback(res.data.data.umkm);
    })
    .catch((err) => {
      console.log(err.message);
      callback([]);
    });
};
export const getAllUmkmByPage = (page, callback) => {
  axios
    .get(`${Endpoint}/umkm/page/${page}`)
    .then((res) => {
      console.log(res);
      callback({
        umkm: res.data.data.umkm,
        page: res.data.page,
        lastPage: res.data.lastPage,
      });
    })
    .catch((err) => {
      console.log(err.message);
      callback(false);
    });
};

export const getUmkm = (slug, callback) => {
  axios
    .get(`${Endpoint}/umkm/${slug}`)
    .then((res) => {
      console.log(res);
      callback(res.data.data);
    })
    .catch((err) => {
      console.log(err);
      callback(false);
    });
};

export const editUmkm = async (data) => {
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
    const res = await axios.put(`${Endpoint}/umkm`, data, config);
    console.log(res);
    return res.data;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const getUmkmByOwner = async (callback) => {
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
    .get(`${Endpoint}/umkm/profile`, config)
    .then((res) => {
      callback(res.data.data);
    })
    .catch((err) => {
      console.log(err.message);
      callback(false);
    });
};

export const addUmkm = async (data) => {
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
    const res = await axios.post(`${Endpoint}/umkm`, data, config);
    console.log(res);
    return res.data;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const deleteUmkm = async () => {
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
    const res = await axios.delete(`${Endpoint}/umkm`, config);
    return res.data;
  } catch (error) {
    console.log(error);
    return false;
  }
};
