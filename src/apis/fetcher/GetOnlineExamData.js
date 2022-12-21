import instance from "../../instance";

export const GetOnlineExamData = async () => {
  const res = await instance({
    url: `liveApp/api/v1/onlineExams`,
    method: "GET",
  }).catch((err) => console.log(err));

  return res.data;
};
