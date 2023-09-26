import React, { useEffect, useLayoutEffect, useRef } from "react";
import { useState } from "react";
import Sidebar from "../../../Components/Sidebar";
import SwipeableTemporaryDrawer from "../../../Components/Material/MaterialSidebar";
import { Autocomplete, Skeleton, TextField } from "@mui/material";
import { Menu } from "@mui/icons-material";
import { useQuery } from "@tanstack/react-query";
import Breadcrumbs from "../../../Components/Material/BreadCrumbs";
import SearchDropDown from "../../../Components/Material/SearchDropDown";

import Snackbars from "../../../Components/Material/Snackbar";
import Loader from "../../../Components/Material/Loader";
import { GetOnlineExamData } from "../../../apis/fetcher/GetOnlineExamData";
import BasicButton from "../../../Components/Material/Button";
import { useSearchParams } from "react-router-dom";
import ChildInfo from "../../../Components/ChildInfo";
import Cookies from "js-cookie";
import { View_Answer_Key } from "../../../apis/fetcher/Feedback";
import ControlledAutoComplete from "../../../Components/Material/ControlledAutoComplete";

const ViewAnswerKey = () => {
  const [loading, setLoading] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState("");
  const [snackbarErr, setSnackbarErr] = useState(false);
  const [subjects, setSubjects] = useState([]);
  let pdfData = {};

  const [filterParams, setFilterParams] = useSearchParams({ q: "", s: "" });
  const q = filterParams.get("q");
  const s = filterParams.get("s");

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
      console.log(data);
    },
    refetchOnWindowFocus: false,
  });

  const { data: AnswerKeyData, AnswerKeyLoading } = useQuery({
    queryKey: ["answer_key_data", q],
    queryFn: () => View_Answer_Key(q, returnToken()),
    cacheTime: 0,
    enabled: !!q,
    onSuccess: (data) => {
      const subjects = Object.values(data).map((item) => {
        return { value: item?.subject };
      });
      setSubjects(subjects);
    },
    refetchOnWindowFocus: false,
  });

  useLayoutEffect(() => {
    if (queryParameters.get("auth")) {
      Cookies.set("token", queryParameters.get("auth"));
    }
  }, []);

  const handleDropDown = (value, type, item) => {
    if (type === "view_answer_key_exam") {
      Object.entries(OnlineExamData?.applicableExams).map((item) => {
        if (item[1] === value) {
          setFilterParams(
            (prev) => {
              prev.set("q", item[0]);
              return prev;
            },
            { replace: true }
          );
        }
      });
    } else if (type === "view_answer_key_subject") {
      console.log("treser");
      setFilterParams(
        (prev) => {
          prev.set("s", value);
          return prev;
        },
        { replace: true }
      );
    }
  };

  // console.log(OnlineExamData);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const show = null;

  const sidebarRef = useRef();

  const handleSidebarCollapsed = () => {
    sidebarRef.current.openSidebar();
  };

  const returnPdfData = () => {
    let url = null;
    for (
      let i = 0;
      i < Object.values(AnswerKeyData ? AnswerKeyData : {}).length;
      i++
    ) {
      const element = Object.values(AnswerKeyData ? AnswerKeyData : {})[i];
      if (element.subject === s) {
        url = element?.answerKeyPdfUrl;
        if (!element.attempted) {
          url = null;
        }
        break;
      }
    }
    return url;
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
        <Loader loading={loading || AnswerKeyLoading} />

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
              <Breadcrumbs crumbs={["Revision & Exam", "View Answer Key"]} />
              <h1 className="font-semibold sm:text-2xl text-xl">
                View Answer Key
              </h1>
              {isLoading ? (
                <Skeleton
                  animation="wave"
                  variant="text"
                  sx={{ fontSize: "2rem", width: "5rem" }}
                />
              ) : (
                <div className="w-[20rem] flex gap-2">
                  <ControlledAutoComplete
                    val={q}
                    data={Object.values(OnlineExamData.applicableExams).map(
                      (item) => {
                        return item;
                      }
                    )}
                    handleDropDown={handleDropDown}
                    Name={"view_answer_key_exam"}
                  />
                  <ControlledAutoComplete
                    Name={"view_answer_key_subject"}
                    val={s}
                    handleDropDown={handleDropDown}
                    disable={subjects.length === 0}
                    data={subjects.map((item) => {
                      return item.value;
                    })}
                  />
                </div>
              )}
              {AnswerKeyLoading ? (
                <Skeleton animation="wave" variant="rectangular" height={300} />
              ) : q && s ? (
                <iframe
                  src={returnPdfData()}
                  frameborder="0"
                  className="w-full h-full"
                ></iframe>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewAnswerKey;
