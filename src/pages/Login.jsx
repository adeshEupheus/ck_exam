// import { Stack } from "@mui/material";
import { Tooltip } from "@mui/material";
import React, { useState } from "react";
import OtpInput from "react-otp-input";
import { useNavigate } from "react-router-dom";
import BasicButton from "../Components/Material/Button";
import RadioButtonsGroup from "../Components/Material/RadioGroups";
import BasicTextFields from "../Components/Material/TextField";

const Login = () => {
  // const [email, setEmail] = useState("");
  // const [otp, setOtp] = useState("");
  // const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // const handleChange = (e) => {
  //   setOtp(e);
  // };

  //   useLayoutEffect(() => {
  //     const setAcademic = async () => {
  //       await axios.get(
  //         "https://schoolsbcontent.imaxprogram.com/app/schoolApp/selectedSchool/?schoolAcademicYearId=8188"
  //       );
  //     };
  //     const ValidateOtp = async () => {
  //       await axios.post(
  //         "https://schoolsbcontent.imaxprogram.com/app/schoolApp/login/otp/validate"
  //       );
  //     };
  //     setAcademic();
  //     ValidateOtp();
  //   }, []);

  return (
    <div className="min-h-[100vh] w-[100vw] bg-gray-200 flex justify-center items-center">
      <div className=" bg-gray-100 flex flex-col gap-3 px-4 py-4">
        <h1 className="text-gray-500 font-semibold text-lg">Sign In</h1>
        <div className="w-full flex justify-center gap-1 flex-col items-center">
          <h1 className="text-gray-400 italic ">
            Not registered with us? Download the learning app now
          </h1>
          <a
            href="https://classklap.com/apps"
            className="text-teal-700 font-semibold underline"
          >
            ClassKlap Apps
          </a>
          <div className="mt-4">
            <RadioButtonsGroup />
          </div>
          {/* <div className="mt-4 flex flex-col gap-3 items-center">
            <h1 className="text-gray-500 font-semibold">Phone Number</h1>
            <BasicTextFields variant={"outlined"} />
            <div className="flex gap-2">
              <BasicButton text={"Trigger OTP"} size={"small"} />
              <BasicButton text={"Use Password"} size={"small"} />
            </div>
            <BasicButton text={"Login"} />
          </div> */}
          <div className="w-[70%]">
            <label
              className="block uppercase text-gray-600 text-xs font-bold mb-2"
              htmlFor="grid-password"
            >
              <span className="text-sm font-semibold text-cyan-800">
                Phone Number
              </span>
            </label>
            <input
              type="email"
              className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
            />
            <div className="w-full flex justify-end mt-2">
              <Tooltip title="Send OTP">
                <span className="text-sm font-semibold mr-2 cursor-pointer text-cyan-800">
                  Send OTP
                </span>
              </Tooltip>
            </div>
          </div>
          <div className="mb-4">
            <label
              className="block uppercase text-gray-600 text-xs font-bold mb-2"
              htmlFor="grid-password"
            >
              <span className="text-sm font-semibold text-cyan-800">
                Enter OTP
              </span>
            </label>
            <OtpInput
              inputStyle={{
                width: "2rem",
                borderRadius: "4px",
                border: "#155e75 1px solid",
                marginLeft: "4px",
                marginRight: "4px",
                padding: "4px",
              }}
              // value={otp}
              // onChange={(e) => handleChange(e)}
              numInputs={6}
              separator={<span>-</span>}
            />
          </div>
          <div onClick={() => navigate("revision_and_exam/online_exam")}>
            <BasicButton text={"Login"} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
