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
    console.log(res);
    return res.data.publicUrl;
  } catch (error) {
    console.log(error);
    return false;
  }
};
