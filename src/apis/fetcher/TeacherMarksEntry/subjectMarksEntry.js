import Cookies from "js-cookie";
import instance from "../../../instance";

export const GetSubjectMarksEntry = async (examId, sectionId, subjectId) => {
  const res = await instance({
    url: `liveApp/api/v1/questionPaperAttempts/${examId}/${sectionId}/${subjectId}`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  }).catch((err) => console.log(err));
  console.log(res.data);
  return res.data;
};

export const GetAnswerKeyStatus = async (examId, sectionId, subjectId) => {
  const res = await instance({
    url: `liveApp/api/v1/previewAnswerKeyStatus/${sectionId}/${examId}/${subjectId}`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  }).catch((err) => console.log(err));
  console.log(res.data);
  return res.data;
};
