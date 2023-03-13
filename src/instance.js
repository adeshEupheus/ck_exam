import axios from "axios";

const instance = axios.create({
  baseURL: "https://live.classklap.com/app/",
  // baseURL: "https://livesbel.xamcheck.com/app/",
});

export default instance;
