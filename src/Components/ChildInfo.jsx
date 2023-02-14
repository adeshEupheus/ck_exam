import { Logout } from "@mui/icons-material";
import { Collapse, Skeleton } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GetChildInfo } from "../apis/fetcher/GetChildInfo";
import { GetChildList } from "../apis/fetcher/GetChildList";
import { SelectChild } from "../apis/fetcher/SelectChild";
import { authActions } from "../Store/auth";
import Loader from "./Material/Loader";

const ChildInfo = () => {
  const [clicked, setClicked] = useState(false);
  const [loading, setLoading] = useState(false);

  const childInfo = useQuery({
    queryKey: ["child_info"],
    queryFn: () => GetChildInfo(),

    cacheTime: 0,
    onSuccess: (data) => {
      // console.log(data);
    },
    refetchOnWindowFocus: false,
  });

  const childList = useQuery({
    queryKey: ["child_list"],
    queryFn: () => GetChildList(),
    cacheTime: 0,
    onSuccess: (data) => {
      // console.log(data);
    },
    refetchOnWindowFocus: false,
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(authActions.logout());
    navigate("/");
  };

  const handleChildClicked = async (item) => {
    setLoading(true);
    const token = await SelectChild(item.childId);
    Cookies.set("token", token);
    setLoading(false);
    window.location.reload();
  };

  return (
    <>
      {childInfo.isLoading || childList.isLoading ? (
        <div className="w-full flex flex-col gap-1 items-end">
          <Skeleton animation="wave" variant="text" width={200} />
          <Skeleton animation="wave" variant="text" width={200} />
          <Skeleton animation="wave" variant="text" width={200} />
        </div>
      ) : (
        <div className="w-full flex flex-col items-end text-sm font-semibold bg-gray-200 text-gray-600 justify-end">
          <Loader loading={loading} />
          <div
            onClick={() => setClicked(!clicked)}
            className="flex flex-col px-4 cursor-pointer py-4 items-start gap-[1px]"
          >
            <span>{childInfo.data.schoolName}</span>
            <span>
              {childInfo.data.schoolName.split(" ")[0]} [
              {childInfo.data.academicYear}]
            </span>
            <span>{childInfo.data.fullName}</span>
          </div>
          <div className="flex flex-col w-fit mr-3">
            <Collapse in={clicked}>
              <div className="h-[5rem] overflow-auto bg-slate-100 shadow-lg">
                {childList.data.map((item, i) => {
                  return (
                    <div
                      key={i}
                      onClick={() => handleChildClicked(item)}
                      className="bg-slate-100 cursor-pointer rounded-t-md py-4 flex w-full flex-col px-4 gap-1"
                    >
                      <span>{item.fullName}</span>
                      <span>
                        {item.schoolCode} {item.sectionClassName}
                      </span>
                    </div>
                  );
                })}
              </div>
              <button
                className="bg-slate-100 rounded-b-md shadow-lg py-4 flex w-full px-4 mr-8 gap-2"
                onClick={handleLogout}
              >
                Log Out <Logout />
              </button>
            </Collapse>
          </div>
        </div>
      )}
    </>
  );
};

export default ChildInfo;
