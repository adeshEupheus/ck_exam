import Cookies from "js-cookie";
import instance from "../../../instance";

export const ToggleMarksEntry = async (data) => {
  //   console.log(type);
  const res = await instance({
    url: `liveApp/api/v1/lockMarksEntry`,
    method: "POST",
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
    data,
  });
  return res;
};

export const UpdateAttendance = async (data) => {
  //   console.log(type);
  const res = await instance({
    url: `liveApp/api/v1/updateAttendance`,
    method: "PUT",
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
    data,
  });
  return res.data;
};

export const EditMarks = async (data) => {
  const res = await instance({
    url: `liveApp/api/v1/editMarks`,
    method: "POST",
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
    data,
  }).catch((err) => {
    console.log(err);
  });
  return res;
};
