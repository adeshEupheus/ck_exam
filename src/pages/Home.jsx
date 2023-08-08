import Cookies from "js-cookie";
import React, { useEffect, useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
import instance from "../instance";
// import MarksEntryOverview from "./TeacherMarksEntry/Overview";
// import OnlineExam from "./R&E/OnlineExam";

const Home = () => {
  const queryParameters = new URLSearchParams(window.location.search);
  const token = queryParameters.get("auth");
  const navigate = useNavigate();

  const routeWhenTokenExist = async () => {
    const res = await instance({
      url: `v1/login/validateToken`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${token ? token : Cookies.get("token")}`,
      },
    }).catch((err) => console.log(err));
    if (res.data === "TEACHER") {
      navigate("/marks_entry/overview");
    } else {
      navigate("/revision_and_exam/online_exam");
    }
  };

  const routeWithCookie = async () => {
    if (Cookies.get("user") === "TEACHER") {
      navigate("/marks_entry/overview");
    } else {
      navigate("/revision_and_exam/online_exam");
    }
    // window.location.reload();
  };

  useLayoutEffect(() => {
    console.log("adsjf");
    if (token) {
      routeWhenTokenExist();
    } else {
      routeWithCookie();
    }
  }, []);
  return <div></div>;
};

export default Home;
