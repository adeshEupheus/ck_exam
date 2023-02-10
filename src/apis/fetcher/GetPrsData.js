import Cookies from "js-cookie";
import instance from "../../instance";

export const GetPrsData = async (examId) => {
  const res = await instance({
    url: `liveApp/api/v1/getStudentPRS/${examId}`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  }).catch((err) => console.log(err));

  return res.data;
};
