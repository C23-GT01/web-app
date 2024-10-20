/* eslint-disable no-undef */
import axios from "axios";
import accessToken from "../utils/accesToken";
const Endpoint = process.env.BE_ENDPOINT;

export const upload = async (file) => {
  const token = await accessToken();
  let config = {};
  if (token) {
    config.headers = {
      Authorization: `Bearer ${token}`,
    };
  } else {
    return false;
  }
  const formData = new FormData();
  formData.append("file", file);
  try {
    const { data: res } = await axios.post(
      `${Endpoint}/upload`,
      formData,
      config
    );
    return res.data.publicUrl;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const deleteFile = async (publicUrl) => {
  const token = await accessToken();
  let config = {};
  if (token) {
    config.headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
  } else {
    return false;
  }

  try {
    const fileName = publicUrl.split("/").pop();
    const { data: res } = await axios.delete(`${Endpoint}/upload`, {
      ...config,
      data: { fileName },
    });

    console.log(res);
    return res.message; // success message
  } catch (error) {
    console.log(error);
    return false;
  }
};
