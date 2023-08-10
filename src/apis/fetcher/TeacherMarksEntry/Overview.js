import instance from "../../instance";

export const GetDropDownData = async () => {
  const res = await instance({
    url: `https://livesbel.xamcheck.com/app/liveApp/api/v1/getMarksEntryData`,
    method: "GET",
  }).catch((err) => console.log(err));

  return res.data;
};

export const GetMarksEntryOverviewData = async (examId, sectionId) => {
  const res = await instance({
    url: `https://livesbel.xamcheck.com/app/liveApp/api/v1/marksEntryOverviewData?examType=${examId}&sectionId=${sectionId}`,
    method: "GET",
  }).catch((err) => console.log(err));

  return res.data;
};
