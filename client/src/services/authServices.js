import axios from "axios";
// import env from "dotenv";
// env.config();//
const SERVER_URL =
  process.env.REACT_APP_SERVER_URL || "https://doodo.vercel.app/api";

const registerUser = (data) => {
  console.log("Register URL:", SERVER_URL + "/register");
  return axios.post(SERVER_URL + "/register", data);
};

const loginUser = (data) => {
  console.log("Login URL:", SERVER_URL + "/login");
  return axios.post(SERVER_URL + "/login", data);
};

const AuthServices = {
  registerUser,
  loginUser,
};

export default AuthServices;
