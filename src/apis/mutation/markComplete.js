import Cookies from "js-cookie";
import instance from "../../instance";

export const MarkComplete = async (prsId) => {
  const res = await instance({
    url: `liveApp/student/markPRSComplete/${prsId}`,
    method: "PUT",
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  });
  return res;
};
