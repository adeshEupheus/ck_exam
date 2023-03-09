import axios from "axios";

const instance = axios.create({
  baseURL: "https://live.classklap.com/app/",
});

export default instance;
