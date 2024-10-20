import axios from "axios";
// import env from "dotenv";
// env.config();
const SERVER_URL =
  process.env.REACT_APP_SERVER_URL || "https://doodo.vercel.app/api";
const registerUser = (data) => {
  return axios.post(SERVER_URL + "/register", data);
};

const loginUser = (data) => {
  return axios.post(SERVER_URL + "/login", data);
};

const AuthServices = {
  registerUser,
  loginUser,
};

export default AuthServices;
