import instance from "../../instance";

export const getQuestionData = async (paperId, questionId) => {
  const res = await instance({
    url: `liveApp/student/getQuestion/${paperId}/qAttempt/${questionId}`,
    method: "GET",
  }).catch((err) => console.log(err));

  return res.data;
};
