import Cookies from "js-cookie";
import instance from "../../instance";

export const GetChildInfo = async () => {
  const res = await instance({
    url: `liveApp/api/v1/childDetails`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  }).catch((err) => console.log(err));

  return res.data;
};
