import instance from "../../instance";

export const sendOtp = async (data) => {
  const res = await instance({
    url: `v1/external/login/student/otp/trigger`,
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: new URLSearchParams(data),
  });
  // console.log(res);
  return res.data;
};

export const validateOtp = async (data) => {
  const res = await instance({
    url: `v1/external/login/student/otp/validate`,
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: new URLSearchParams(data),
  });
  // console.log(res);
  return res.data;
};
