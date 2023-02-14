import React, { useEffect, useLayoutEffect, useRef } from "react";
import { useState } from "react";
import Sidebar from "../../Components/Sidebar";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import SwipeableTemporaryDrawer from "../../Components/Material/MaterialSidebar";
import { Skeleton, Switch } from "@mui/material";
import { Menu } from "@mui/icons-material";
import { useMutation, useQuery } from "@tanstack/react-query";
import Breadcrumbs from "../../Components/Material/BreadCrumbs";
import SearchDropDown from "../../Components/Material/SearchDropDown";

import Snackbars from "../../Components/Material/Snackbar";
import Loader from "../../Components/Material/Loader";
import { GetOnlineExamData } from "../../apis/fetcher/GetOnlineExamData";
import BasicButton from "../../Components/Material/Button";
import { Link, useNavigate } from "react-router-dom";
import ChildInfo from "../../Components/ChildInfo";

const OnlineExam = () => {
  const [filter, setFilter] = useState("Select");
  const [loading, setLoading] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState("");
  const [snackbarErr, setSnackbarErr] = useState(false);
  const navigate = useNavigate();

  const snackbarRef = useRef();
  const switchRefs = useRef([]);
  switchRefs.current = [];

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
      // console.log(data);
    },
    refetchOnWindowFocus: false,
  });

  const handleDropDown = (value, type, item) => {
    setFilter(value.value);
    // setFilter()
  };

  // console.log(OnlineExamData);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const show = null;

  // const handleSwitchChange = (name, status, item) => {
  //   // console.log(!item.locked);
  //   const apiDataBody = {
  //     grade: item.grade.name,
  //     exam: id,
  //     examName: item.examName.name,
  //     duration: item.duration,
  //     locked: !item.locked,
  //     marksSyllabus: item.selectedMarksSyllabus.name,
  //     questionPaperTypeDeliveryFormat: item.questionPaperDeliveryModeType.name,
  //   };
  //   lockMutation.mutate({
  //     examType: id,
  //     gradeId: apiDataBody.grade,
  //     data: apiDataBody,
  //     item,
  //   });
  // };

  const returnData = () => {
    if (filter === "Select") {
      return [];
    }

    let code;
    Object.entries(OnlineExamData.applicableExams).forEach(([key, value]) => {
      console.log(key, value);
      if (filter === value) {
        code = key;
      }
    });
    const newArray = OnlineExamData.onlineExamResponses.filter(
      (item) => item.examName === code
    );
    return newArray;
  };

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

          <div className="relative flex flex-col w-full justify-center items-start gap-4 bg-gray-200">
            <div className="sm:px-8 px-4 w-full flex flex-col gap-4 mb-4">
              <Breadcrumbs crumbs={["Revision & Exam", "Online Exams"]} />
              <h1 className="font-semibold sm:text-2xl text-xl">Online Exam</h1>
              {isLoading ? (
                <Skeleton
                  animation="wave"
                  variant="text"
                  sx={{ fontSize: "2rem", width: "5rem" }}
                />
              ) : (
                <div className="w-[10rem]">
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
                    defaultValue={{ value: filter }}
                    size={"small"}
                  />
                </div>
              )}
              {isLoading ? (
                <Skeleton
                  // sx={{ bgcolor: "grey.400" }}
                  animation="wave"
                  variant="rectangular"
                  height={300}
                />
              ) : (
                <TableContainer
                  className="sm:!w-full !overflow-auto max-h-[70vh] "
                  component={Paper}
                >
                  <Table
                    className="!w-full"
                    //   sx={{ width: 1000 }}
                    aria-label="simple table"
                  >
                    <TableHead className="w-full">
                      <TableRow className="w-full">
                        <TableCell align="right">
                          <div className="flex flex-col items-center gap-2">
                            <h1 className="font-bold">Subject</h1>
                          </div>
                        </TableCell>
                        <TableCell align="right">
                          <div className="flex flex-col items-center gap-2">
                            <h1 className="font-bold">Marks</h1>
                          </div>
                        </TableCell>
                        <TableCell align="right" className="min-w-[10rem]">
                          <div className="flex flex-col items-center gap-2 !min-w-[10rem]">
                            <h1 className="font-bold">Exam Date & Time</h1>
                          </div>
                        </TableCell>
                        <TableCell align="right">
                          <div className="flex flex-col items-center gap-2">
                            <h1 className="font-semibold"></h1>
                          </div>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {returnData().map((item, index) => (
                        <TableRow
                          key={index}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell component="th" scope="row" align="center">
                            <h1 className="font-bold">{item.subject}</h1>
                          </TableCell>
                          <TableCell align="center">
                            <h1 className="font-bold">{item.marks}</h1>
                          </TableCell>
                          <TableCell align="center">
                            <h1 className="font-bold">
                              {item.formattedDateTime}
                            </h1>
                          </TableCell>
                          {/* <TableCell align="center">
                            <div
                              onClick={() =>
                                item.examActive
                                  ? navigate("/revision_and_exam/start_exam")
                                  : null
                              }
                            >
                              <BasicButton
                                size={"small"}
                                text={
                                  item.examSubmitted
                                    ? "Exam Submitted"
                                    : "Take Exam"
                                }
                                disable={!item.examActive}
                              />
                            </div>
                          </TableCell> */}
                          <TakeExamButton item={item} />
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const TakeExamButton = ({ item }) => {
  const [allow, setAllow] = useState(null);
  // console.log(allow);

  useEffect(() => {
    const changeAllow = setInterval(() => {
      setAllow((prev) => prev - 1);
    }, 60000);

    return () => {
      clearInterval(changeAllow);
    };
  }, [allow]);

  useLayoutEffect(() => {
    let currentTime = new Date().getHours() * 60 + new Date().getMinutes();
    let given = item.examDateTime[3] * 60 + item.examDateTime[4];
    setAllow(given - currentTime);
  }, []);

  return (
    <TableCell align="center">
      <Link
        to={`${
          !item.examSubmitted && allow <= 10 && !item.examOver
            ? "/revision_and_exam/start_exam"
            : ""
        }`}
        state={{
          data: {
            examTime: item.examDateTime,
            duration: item.examDurationMinutes,
            paperId: item.questionPaperAttemptId,
          },
        }}
      >
        <div>
          <BasicButton
            size={"small"}
            text={
              item.examSubmitted
                ? "Exam Submitted"
                : item.examOver
                ? "Exam Over"
                : "Take Exam"
            }
            disable={
              !item.examSubmitted && allow <= 10 && !item.examOver
                ? false
                : true
              // item.examSubmitted || item.examOver ? false : true
            }
          />
        </div>
      </Link>
    </TableCell>
  );
};

export default OnlineExam;
