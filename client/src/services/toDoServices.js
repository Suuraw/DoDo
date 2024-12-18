import axios from "axios";
import { getUserDetails } from "../util/GetUser";
// import env from "dotenv";
// env.config();//
const SERVER_URL = process.env.REACT_APP_SERVER_URL+"/todo";

const authHeaders = () => {
  let userToken = getUserDetails()?.token;
  return { headers: { Authorization: userToken } };
};

const createToDo = (data) => {
  return axios.post(SERVER_URL + "/create-to-do/", data, authHeaders());
};

const getAllToDo = (userId) => {
  return axios.get(SERVER_URL + "/get-all-to-do/" + userId, authHeaders());
};

const deleteToDo = (id) => {
  return axios.delete(SERVER_URL + "/delete-to-do/" + id, authHeaders());
};

const updateToDo = (id, data) => {
  return axios.patch(SERVER_URL + "/update-to-do/" + id, data, authHeaders());
};

const ToDoServices = {
  createToDo,
  getAllToDo,
  deleteToDo,
  updateToDo,
};

export default ToDoServices;
