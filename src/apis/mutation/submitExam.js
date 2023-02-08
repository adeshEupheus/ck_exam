import Cookies from "js-cookie";
import instance from "../../instance";

export const SubmitExam = async (paperId) => {
  const res = await instance({
    url: `liveApp/student/submitExam/${paperId}`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  }).catch((err) => console.log(err));

  return res.data;
};
