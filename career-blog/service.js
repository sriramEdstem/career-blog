import config from "./config";
import axios from "axios";

export const login = async (payload) => {
  try {
    const response = await axios.post(
      `${config.servicePath}/security/login`,
      payload
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
export const register = async (payload) => {
  try {
    const response = await axios.post(
      `${config.servicePath}/security/signup`,
      payload
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
