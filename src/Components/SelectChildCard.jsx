import Cookies from "js-cookie";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SelectChild } from "../apis/fetcher/SelectChild";
import { authActions } from "../Store/auth";

const SelectChildCard = ({ details }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSelectSchool = async (id) => {
    const token = await SelectChild(id);
    Cookies.set("token", token);
    dispatch(authActions.login());
    navigate("/revision_and_exam/online_exam");
  };
  return (
    <div
      onClick={() => handleSelectSchool(details.childId)}
      className="bg-white flex border-2 cursor-pointer border-slate-200 rounded-lg p-4 mb-2 text-blue-500"
    >
      <div className="bg-slate-200 rounded-full ">
        <img src=""></img>
      </div>
      <div className="flex w-full justify-around items-center">
        <div className="flex flex-col p-2  ml-2">
          <div className="font-semibold">{details.fullName}</div>
          <div className="">
            {details.schoolCode} {details.sectionClassName}
          </div>
        </div>
        <div className="text-green-600 font-semibold sm:text-base text-sm">
          Verified By School
        </div>
      </div>
    </div>
  );
};

export default SelectChildCard;
