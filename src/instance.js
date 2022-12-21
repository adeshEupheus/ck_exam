import axios from "axios";

const instance = axios.create({
  baseURL: "https://livesbel.xamcheck.com/app/",
});

export default instance;
