import Cookies from "js-cookie";
import instance from "../../../instance";

export const GetExamConfigData = async () => {
  const res = await instance({
    url: `liveApp/api/v1/getMarksEntryData`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  }).catch((err) => console.log(err));
  console.log(res.data);
  return res.data;
};

export const GetExamOverviewData = async (examId, sectionId) => {
  const res = await instance({
    url: `liveApp/api/v1/marksEntryOverviewData?examType=${examId}&sectionId=${sectionId}`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  }).catch((err) => console.log(err));
  console.log(res.data);
  return res.data;
};
