import Cookies from "js-cookie";
import instance from "../../instance";

export const GetExamQuestionData = async (id, token) => {
  const res = await instance({
    url: `liveApp/student/getQuestionAttempts/${id}`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${token ? token : Cookies.get("token")}`,
    },
  }).catch((err) => console.log(err));

  return res.data;
};
