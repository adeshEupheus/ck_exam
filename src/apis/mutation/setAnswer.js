import instance from "../../instance";

export const SetAnswer = async (paperId, qAttemptId, qId, answer) => {
  const res = await instance({
    url: `liveApp/student/exam/${paperId}/setAnswer/${qAttemptId}/question/${qId}`,
    method: "PUT",
    data: { answerByStudent: answer },
  });
  // console.log(res);
};
