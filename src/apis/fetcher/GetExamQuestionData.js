import instance from "../../instance";

export const GetExamQuestionData = async (id) => {
  const res = await instance({
    url: `liveApp/student/getQuestionAttempts/${id}`,
    method: "GET",
  }).catch((err) => console.log(err));

  return res.data;
};
