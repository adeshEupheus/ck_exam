import Cookies from "js-cookie";
import instance from "../../instance";

export const GetOnlineExamData = async () => {
  const res = await instance({
    url: `liveApp/api/v1/onlineExams`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  }).catch((err) => console.log(err));

  return res.data;
};
