import { Tooltip } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";
import React, { useState, useRef } from "react";
import OtpInput from "react-otp-input";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { sendOtp, validateOtp } from "../apis/mutation/login";
import BasicButton from "../Components/Material/Button";
import Loader from "../Components/Material/Loader";
import RadioButtonsGroup from "../Components/Material/RadioGroups";
import Snackbars from "../Components/Material/Snackbar";
import { authActions } from "../Store/auth";

const Login = () => {
  const [phone, setPhone] = useState("");
  const dispatch = useDispatch();
  const [type, setType] = useState("");
  const [otp, setOtp] = useState("");
  const [otpDisable, setOtpDisable] = useState(true);
  const [snackbarValues, setSnackbarValues] = useState({
    message: "",
    status: false,
  });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const snackbarRef = useRef();

  const mutation = useMutation({
    mutationFn: async (value) => {
      if (value.name === "sendOtp" && type && phone.toString().length === 10) {
        setLoading(true);
        let data = {
          phone: phone,
          personRoleType: type,
        };
        const res = await sendOtp(data);
        console.log(res);
        setLoading(false);
        if (res.success === "true") {
          setSnackbarValues({
            status: false,
            message: res.message,
          });
          snackbarRef.current.openSnackbar();
          setOtpDisable(false);
        }
      } else if ((value.name = "validateOtp")) {
        if (!otpDisable) {
          setLoading(true);
          let data = {
            phone: phone,
            personRoleType: type,
            otp: otp,
          };
          const res = await validateOtp(data).catch((err) => {
            if (err.response.data.success === "false") {
              setSnackbarValues({
                status: true,
                message: err.response.data.message,
              });
              snackbarRef.current.openSnackbar();
              setOtp("");
              setLoading(false);
            }
          });
          if (res.success === "true") {
            Cookies.set("token", res.token);
            Cookies.set("user", type);
            dispatch(authActions.login());
            if (type === "GUARDIAN") {
              navigate("/select_child");
            } else {
              navigate("/marks_entry/overview");
            }
          }

          setLoading(false);
        }
      }
    },
  });

  const changePhone = (value) => {
    if (phone.length < 10) {
      setPhone(value);
    } else if (value < phone) {
      setPhone(value);
    }
  };

  const changeType = (value) => {
    if (value.toUpperCase() === "STUDENT") {
      setType("GUARDIAN");
    } else {
      setType(value.toUpperCase());
    }
  };

  return (
    <>
      <Snackbars
        ref={snackbarRef}
        snackbarErrStatus={snackbarValues.status}
        message={snackbarValues.message}
      />
      <div className="min-h-[100vh] w-[100vw] bg-gray-200 flex justify-center items-center">
        <Loader loading={loading} />
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
              <RadioButtonsGroup changeType={changeType} />
            </div>

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
                onChange={(e) => changePhone(e.target.value)}
                type="number"
                id="phoneNumber"
                value={phone}
                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              />
              <div className="w-full flex justify-end mt-2">
                <Tooltip title="Send OTP">
                  <span
                    onClick={() => mutation.mutate({ name: "sendOtp" })}
                    className="text-sm font-semibold mr-2 cursor-pointer text-cyan-800"
                  >
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
                value={otp}
                onChange={(e) => setOtp(e)}
                numInputs={6}
                isDisabled={otpDisable}
                separator={<span>-</span>}
              />
            </div>
            {/* <div onClick={() => navigate("revision_and_exam/online_exam")}> */}
            <div onClick={() => mutation.mutate({ name: "validateOtp" })}>
              <BasicButton text={"Login"} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
