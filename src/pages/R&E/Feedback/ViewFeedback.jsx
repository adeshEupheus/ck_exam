import React, { useEffect, useLayoutEffect, useRef } from "react";
import { useState } from "react";
import Sidebar from "../../../Components/Sidebar";
import SwipeableTemporaryDrawer from "../../../Components/Material/MaterialSidebar";
import { Autocomplete, Skeleton, Switch, TextField } from "@mui/material";
import { Menu } from "@mui/icons-material";
import { useMutation, useQuery } from "@tanstack/react-query";
import Breadcrumbs from "../../../Components/Material/BreadCrumbs";
import SearchDropDown from "../../../Components/Material/SearchDropDown";

import Snackbars from "../../../Components/Material/Snackbar";
import Loader from "../../../Components/Material/Loader";
import { GetOnlineExamData } from "../../../apis/fetcher/GetOnlineExamData";
import BasicButton from "../../../Components/Material/Button";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import ChildInfo from "../../../Components/ChildInfo";
import Cookies from "js-cookie";
import instance from "../../../instance";
import { View_Feedback } from "../../../apis/fetcher/Feedback";
import ControlledAutoComplete from "../../../Components/Material/ControlledAutoComplete";

const ViewFeedback = () => {
  const [loading, setLoading] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState("");
  const [snackbarErr, setSnackbarErr] = useState(false);
  //   const navigate = useNavigate();

  const [filterParams, setFilterParams] = useSearchParams({ q: "" });
  const q = filterParams.get("q");

  const snackbarRef = useRef();

  const [queryParameters] = useSearchParams();
  const returnToken = () => {
    return queryParameters.get("auth");
  };

  const {
    data: OnlineExamData,
    isLoading,
    refetch,
    isRefetching,
  } = useQuery({
    queryKey: ["online_exam_data"],
    queryFn: () => GetOnlineExamData(returnToken()),
    cacheTime: 0,
    onSuccess: (data) => {
      //   setFilterParams(
      //     (prev) => {
      //       prev.set("q", Object.keys(data?.applicableExams)[0]);
      //       return prev;
      //     },
      //     { replace: true }
      //   );
    },
    refetchOnWindowFocus: false,
  });

  const { data: FeedbackData, FeedbackLoading } = useQuery({
    queryKey: ["feedback_data", q],
    queryFn: () => View_Feedback(q, returnToken()),
    cacheTime: 0,
    enabled: !!q,
    onSuccess: (data) => {
      console.log(data);
    },
    refetchOnWindowFocus: false,
  });

  useLayoutEffect(() => {
    if (queryParameters.get("auth")) {
      Cookies.set("token", queryParameters.get("auth"));
    }
  }, []);

  const handleDropDown = (value, type, item) => {
    Object.entries(OnlineExamData?.applicableExams).map((item) => {
      if (item[1] === value) {
        console.log(value.value);
        setFilterParams(
          (prev) => {
            prev.set("q", item[0]);
            return prev;
          },
          { replace: true }
        );
      }
    });
  };

  // console.log(OnlineExamData);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const show = null;

  const sidebarRef = useRef();

  const handleSidebarCollapsed = () => {
    sidebarRef.current.openSidebar();
  };

  useEffect(() => {
    document.title = "Revision & Exam - ClassKlap";
    const handleWidth = () => {
      if (window.innerWidth > 1024) {
        setSidebarCollapsed(false);
      } else {
        setSidebarCollapsed(true);
      }
    };
    window.addEventListener("resize", handleWidth);
    handleWidth();
    window.scroll(0, 0);

    return () => {
      window.removeEventListener("resize", handleWidth);
    };
  }, []);
  return (
    <>
      <Snackbars
        ref={snackbarRef}
        message={snackbarMsg}
        snackbarErrStatus={snackbarErr}
      />
      <div className="flex w-[100%] min-h-[100vh]">
        <Sidebar
          highLight={"revision_and_exam"}
          sidebarCollapsed={sidebarCollapsed}
          show={show}
        />
        <Loader loading={loading} />

        <div>
          <SwipeableTemporaryDrawer
            ref={sidebarRef}
            sidebarCollapsed={sidebarCollapsed}
            show={show}
            highLight={""}
          />
        </div>
        <div
          className={`flex flex-col w-[100vw] bg-gray-200 relative transition-all overflow-hidden ease-linear duration-300 lg:w-[83vw] lg:ml-[18vw] ${
            window.innerWidth < 1024 ? null : "md:ml-[30vw] ml-[85vw]"
          } `}
        >
          <div
            className="lg:hidden absolute cursor-pointer top-4 left-4"
            onClick={handleSidebarCollapsed}
          >
            <Menu className={"text-[#67748e]"} />
          </div>
          <ChildInfo />

          <div className="relative flex flex-col w-full justify-center items-start gap-4 bg-gray-200 min-h-screen">
            <div className="sm:px-8 px-4 w-full flex flex-col gap-4 mb-4 h-full">
              <Breadcrumbs crumbs={["Revision & Exam", "View Feedback"]} />
              <h1 className="font-semibold sm:text-2xl text-xl">
                View Feedback
              </h1>
              {isLoading ? (
                <Skeleton
                  animation="wave"
                  variant="text"
                  sx={{ fontSize: "2rem", width: "5rem" }}
                />
              ) : (
                <div className="w-[10rem]">
                  <ControlledAutoComplete
                    data={Object.values(OnlineExamData.applicableExams).map(
                      (item) => {
                        return item;
                      }
                    )}
                    handleDropDown={handleDropDown}
                    val={q}
                  />
                </div>
              )}
              {FeedbackLoading ? (
                <Skeleton
                  // sx={{ bgcolor: "grey.400" }}
                  animation="wave"
                  variant="rectangular"
                  height={300}
                />
              ) : FeedbackData?.exams.length === 0 ? (
                <p className="font-semibold text-xl w-full flex justify-center">
                  No Data Available
                </p>
              ) : (
                <iframe
                  className="w-full h-full"
                  src={
                    FeedbackData?.exams[0]?.studentExamReportResponse
                      ?.reportCardPdfUrl
                  }
                  frameborder="0"
                ></iframe>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewFeedback;
