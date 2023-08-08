import Cookies from "js-cookie";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const alterPage = () => {
    console.log(Cookies.get("user"));
    if (Cookies.get("user") === "TEACHER") {
      navigate("/marks_entry/overview");
      window.location.reload();
    } else if (Cookies.get("user") === "GUARDIAN") {
      navigate("/revision_and_exam/online_exam");
      window.location.reload();
    }
  };

  useEffect(() => {
    alterPage();
  }, []);

  return <div></div>;
};

export default Home;
