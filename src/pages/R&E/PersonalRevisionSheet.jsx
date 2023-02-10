import React, { useEffect, useRef } from "react";
import { useState } from "react";
import Sidebar from "../../Components/Sidebar";
import SwipeableTemporaryDrawer from "../../Components/Material/MaterialSidebar";
import { Button, Skeleton, Switch } from "@mui/material";
import { Menu } from "@mui/icons-material";
import { useQuery } from "@tanstack/react-query";
import Breadcrumbs from "../../Components/Material/BreadCrumbs";
import SearchDropDown from "../../Components/Material/SearchDropDown";
import Snackbars from "../../Components/Material/Snackbar";
import Loader from "../../Components/Material/Loader";
import { GetOnlineExamData } from "../../apis/fetcher/GetOnlineExamData";
import RevisionBar from "../../Components/Material/RevisionBar";
import { GetPrsData } from "../../apis/fetcher/GetPrsData";

const PersonalRevisionSheet = () => {
  const [id, setId] = useState("");
  const [loading, setLoading] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState("");
  const [snackbarErr, setSnackbarErr] = useState(false);

  const snackbarRef = useRef();
  const switchRefs = useRef([]);
  switchRefs.current = [];

  const addToRef = (el) => {
    // console.count(el);
    if (el && !switchRefs.current.includes(el)) {
      switchRefs.current.push(el);
    }
  };

  const {
    data: OnlineExamData,
    isLoading,
    refetch,
    isRefetching,
  } = useQuery({
    queryKey: ["online_exam_data"],
    queryFn: () => GetOnlineExamData(),
    cacheTime: 0,
    onSuccess: (data) => {
      console.log(data);
      setId(Object.keys(data.applicableExams)[0]);
    },
    refetchOnWindowFocus: false,
  });

  const {
    data: PrsData,
    isLoading: PrsLoading,
    // refetch,
    // isRefetching,
  } = useQuery({
    queryKey: ["Prs_data", id],
    queryFn: () => GetPrsData(id),
    enabled: !!id,
    cacheTime: 0,
    onSuccess: (data) => {
      console.log(data);
    },
    refetchOnWindowFocus: false,
  });

  const handleDropDown = (value, type, item) => {
    // console.log(value);
    Object.entries(OnlineExamData.applicableExams).map((item) => {
      if (value.value === item[1]) {
        setId(item[0]);
      }
    });
  };

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const show = null;

  // const returnData = () => {
  //   if (filter === "Select") {
  //     return [];
  //   }

  //   let code;

  //   Object.entries(OnlineExamData.applicableExams).forEach(([key, value]) => {
  //     console.log(key, value);
  //     if (filter === value) {
  //       code = key;
  //     }
  //   });
  //   const newArray = OnlineExamData.onlineExamResponses.filter(
  //     (item) => item.examName === code
  //   );
  //   return newArray;
  // };

  const sidebarRef = useRef();

  const handleSidebarCollapsed = () => {
    sidebarRef.current.openSidebar();
  };

  useEffect(() => {
    document.title = "Exam Set Up - ClassKlap";
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
            highLight={"exam_setup"}
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
          <div className="w-full flex text-sm font-semibold bg-gray-200 text-gray-600 justify-end">
            <div className="flex flex-col px-4 cursor-pointer py-4 items-end gap-[1px]">
              <span>Vidyanidhi Public School</span>
              <span>KA2015 [2022-2023]</span>
            </div>
          </div>

          <div className="relative flex flex-col w-full justify-center items-start gap-4 bg-gray-200">
            <div className="sm:px-8 px-4 w-full flex flex-col gap-4 mb-4">
              <Breadcrumbs
                crumbs={["Revision & Exam", "Personal Revision Sheet"]}
              />
              <h1 className="font-semibold sm:text-2xl text-xl">
                PERSONAL REVISION SHEET
              </h1>
              {isLoading ? (
                <Skeleton
                  animation="wave"
                  variant="text"
                  sx={{ fontSize: "2rem", width: "5rem" }}
                />
              ) : (
                <div className="w-[11rem]">
                  <SearchDropDown
                    handleDropDown={handleDropDown}
                    data={Object.values(OnlineExamData.applicableExams).map(
                      (item) => {
                        // console.log(item);
                        return { value: item };
                      }
                    )}
                    variant={"outlined"}
                    Name={"exam_setup"}
                    defaultValue={{
                      value: Object.values(OnlineExamData.applicableExams)[0],
                    }}
                    size={"small"}
                  />
                </div>
              )}
              {PrsLoading ? (
                <Skeleton animation="wave" variant="rectangular" height={300} />
              ) : (
                <>
                  {PrsData[0]?.examPRSResponses.map((item) => {
                    return (
                      <div className="flex w-full gap-2 p-2 bg-slate-300">
                        <div>
                          <img
                            src={item.subjectImagePath}
                            alt="image"
                            className=" w-[4rem] h-[5rem]  sm:mt-0  "
                          ></img>
                        </div>
                        <RevisionBar data={item} />
                      </div>
                    );
                  })}
                  {/* <div className="flex w-full gap-2 p-2 bg-slate-300">
                    <div>
                      <img
                        src="https://classklap-assets.s3.ap-south-1.amazonaws.com/assets/reportCardIcons/Maths.svg"
                        alt="image"
                        className=" w-[4rem] h-[5rem]  sm:mt-0  "
                      ></img>
                    </div>
                    <RevisionBar />
                  </div> */}
                  {/* <div className="flex w-full gap-2 p-2 bg-slate-300">
                    <div>
                      <img
                        src="https://classklap-assets.s3.ap-south-1.amazonaws.com/assets/reportCardIcons/English.svg"
                        alt="image"
                        className=" w-[4rem] h-[5rem]  sm:mt-0 "
                      ></img>
                    </div>
                    <RevisionBar />
                  </div> */}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PersonalRevisionSheet;
