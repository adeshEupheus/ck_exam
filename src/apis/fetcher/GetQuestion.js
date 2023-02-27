import Cookies from "js-cookie";
import instance from "../../instance";

export const getQuestionData = async (paperId, questionId, token) => {
  const res = await instance({
    url: `liveApp/student/getQuestion/${paperId}/qAttempt/${questionId}`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${token ? token : Cookies.get("token")}`,
    },
  }).catch((err) => console.log(err));

  return res.data;
};
