import axios from "axios";

const Instance = axios.create({
  baseURL: 'http://64.227.160.58:5003',
  credentials: "include",
  withCredentials: true,
});
export default Instance;
