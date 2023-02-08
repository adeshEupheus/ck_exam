import axios from "axios";

const instance = axios.create({
  baseURL: "https://livesb0.imaxprogram.com/app/",
});

export default instance;
