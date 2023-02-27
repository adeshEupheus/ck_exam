import Cookies from "js-cookie";
import instance from "../../instance";

export const SetAnswer = async (paperId, qAttemptId, qId, answer, token) => {
  const res = await instance({
    url: `liveApp/student/exam/${paperId}/setAnswer/${qAttemptId}/question/${qId}`,
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token ? token : Cookies.get("token")}`,
    },
    data: { answerByStudent: answer },
  });
  // console.log(res);
};
