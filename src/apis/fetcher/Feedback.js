import Cookies from "js-cookie";
import instance from "../../instance";

export const View_Feedback = async (id, token) => {
  const res = await instance({
    url: `liveApp/student/feedbackReport/${id}`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${token ? token : Cookies.get("token")}`,
    },
  }).catch((err) => console.log(err));

  return res.data;
};

export const View_Answer_Key = async (id, token) => {
  const res = await instance({
    url: `liveApp/student/answerKey/${id}`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${token ? token : Cookies.get("token")}`,
    },
  }).catch((err) => console.log(err));

  return res.data;
};
