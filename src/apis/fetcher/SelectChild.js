import Cookies from "js-cookie";
import instance from "../../instance";

export const SelectChild = async (id, token) => {
  const res = await instance({
    url: `liveApp/selectedChildren?childId=${id}`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${token ? token : Cookies.get("token")}`,
    },
  }).catch((err) => console.log(err));

  return res.data;
};
