import Cookies from "js-cookie";
import instance from "../../instance";

export const SubmitExam = async (paperId, token) => {
  const res = await instance({
    url: `liveApp/student/submitExam/${paperId}`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${token ? token : Cookies.get("token")}`,
    },
  }).catch((err) => console.log(err));

  return res.data;
};
