/* eslint-disable no-undef */
import axios from "axios";
import accessToken from "../utils/accesToken";
const Endpoint = process.env.BE_ENDPOINT;

export const getAllProducts = (callback) => {
  axios
    .get(`${process.env.BE_ENDPOINT}/product`)
    .then((res) => {
      callback(res.data.data.products);
    })
    .catch((err) => {
      console.log(err.message);
      callback([]);
    });
};

export const getProduct = (slug, callback) => {
  axios
    .get(`${process.env.BE_ENDPOINT}/product/${slug}`)
    .then((res) => {
      callback(res.data.data);
    })
    .catch((err) => {
      console.log(err);
      callback(false);
    });
};

export const getAllProductsByPage = (page, callback) => {
  axios
    .get(`${process.env.BE_ENDPOINT}/product/page/${page}`)
    .then((res) => {
      callback({
        products: res.data.data.products,
        page: res.data.page,
        lastPage: res.data.lastPage,
      });
    })
    .catch((err) => {
      console.log(err.message);
      callback(false);
    });
};

export const getAllCategories = async (callback) => {
  axios
    .get(`${process.env.BE_ENDPOINT}/category`)
    .then((res) => {
      callback(res.data.data.categories);
    })
    .catch((err) => {
      console.log(err.message);
      callback(false);
    });
};

export const addProduct = async (data) => {
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
    const res = await axios.post(`${Endpoint}/product`, data, config);
    console.log(res);
    return res.data;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const editProduct = async (slug, data) => {
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
    const res = await axios.put(`${Endpoint}/product/${slug}`, data, config);
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error);
    return false;
  }
};



export const deleteProduct = async (slug) => {
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
    const res = await axios.delete(`${Endpoint}/product/${slug}`, config);
    return res.data;
  } catch (error) {
    console.log(error);
    return false;
  }
};
