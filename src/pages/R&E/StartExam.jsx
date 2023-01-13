import React, { useEffect, useLayoutEffect, useRef } from "react";
import { useState } from "react";
import Sidebar from "../../Components/Sidebar";

import SwipeableTemporaryDrawer from "../../Components/Material/MaterialSidebar";
import { Menu } from "@mui/icons-material";

import Snackbars from "../../Components/Material/Snackbar";
import Loader from "../../Components/Material/Loader";
import BasicButton from "../../Components/Material/Button";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Skeleton,
  Slide,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";

const StartExam = () => {
  const location = useLocation();
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState("");
  const [snackbarErr, setSnackbarErr] = useState(false);
  const [allow, setAllow] = useState(null);
  const [timer, setTimer] = useState({
    hour: null,
    seconds: 0,
  });

  const snackbarRef = useRef();

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const show = null;

  const sidebarRef = useRef();

  const handleSidebarCollapsed = () => {
    sidebarRef.current.openSidebar();
  };

  useLayoutEffect(() => {
    let currentTime = new Date().getHours() * 60 + new Date().getMinutes();
    let given =
      location.state.data.examTime[3] * 60 + location.state.data.examTime[4];
    console.log(location.state.data.duration + (given - currentTime));
    setAllow(given - currentTime);
    if (given - currentTime < 0) {
      setTimer({
        hour: location.state.data.duration + (given - currentTime),
        seconds: "00",
      });
    } else {
      setTimer({
        hour: location.state.data.duration,
        seconds: "00",
      });
    }
  }, []);

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

  useEffect(() => {
    const changeAllow = setInterval(() => {
      setAllow((prev) => {
        return prev - 1;
      });
    }, 60000);

    let changeTimer;
    if (timer.hour !== null) {
      changeTimer = setInterval(() => {
        if (allow === 0 || allow < 0) {
          if (timer.seconds === "00") {
            setTimer((prev) => {
              return {
                hour: prev.hour - 1,
                seconds: 59,
              };
            });
          } else if (timer.seconds === 0 && timer.hour === 0) {
            setOpenDialog(true);
          } else if (timer.seconds === 0) {
            setTimer((prev) => {
              return {
                hour: prev.hour - 1,
                seconds: 59,
              };
            });
          } else {
            setTimer((prev) => {
              return {
                hour: prev.hour,
                seconds: prev.seconds - 1,
              };
            });
          }
        }
      }, 1000);
    }

    return () => {
      clearInterval(changeTimer);
      clearInterval(changeAllow);
    };
  }, [timer.seconds, allow]);

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
        <TimesUpDialog openDialog={openDialog} />

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
            <div className="flex flex-col px-6 cursor-pointer py-8 items-end gap-[1px] ">
              <span>Time Remaining</span>
              <span>
                {String(timer.hour).padStart(2, "0")}m:
                {String(timer.seconds).padStart(2, "0")}s
              </span>
              {/* <span><CountDown duration={2*24*60*60}/></span> */}
            </div>
          </div>

          <div className="relative flex flex-col w-full justify-center items-start gap-4 bg-gray-200">
            <div className="sm:px-16 px-4 w-full flex flex-col gap-4 mb-4">
              <h1 className="text-slate-400 sm:text-2xl text-xl">
                ENGLISH-RSA1
              </h1>
              <div>
                <h1 className="font-semibold sm:text-xl">1.GET READY</h1>
                <p className="text-sm">
                  {" "}
                  a ) You need good internet and a fully-charged laptop OR phone
                </p>
                <p className="text-sm">
                  b ) Open the learning APP on your mobile OR on the chrome tab
                  on your laptop
                </p>
              </div>

              <div>
                <h1 className="font-semibold  sm:text-xl ">2.START!</h1>
                <p className="text-sm "> a ) Click START.Do NOT refresh.</p>
                <p className="text-sm">
                  b ) Click on the drop-down menu to see the options
                </p>
                <p className="text-sm">
                  c ) Choose the option you think is correct
                </p>
              </div>
              <div>
                <h1 className="font-semibold  sm:text-xl">
                  3.CHECK YOUR ANSWERS!
                </h1>
                <p className="text-sm">
                  {" "}
                  a ) Click on the &#9633; button on top right of your screen to
                  check how many questions you have completed.
                </p>
                <p className="text-sm">b ) Review answers before you submit</p>
                <p className="text-sm">c ) Finish within the time limit</p>
              </div>
              <div className="w-full flex flex-col gap-3 items-center justify-center">
                <div>
                  <h1 className="font-semibold  sm:text-2xl text-xl ml-30">
                    {" "}
                    ALL THE BEST!!
                  </h1>
                </div>
                <div>
                  <p className="text-gray-600 font-semibold">
                    {" "}
                    Exam start time is{" "}
                    {String(location.state.data.examTime[3]).padStart(2, "0")}:
                    {String(location.state.data.examTime[4]).padStart(2, "0")}
                  </p>
                </div>
                {allow > 0 ? (
                  <BasicButton
                    text={"START"}
                    disable={allow > 0 ? true : false}
                  />
                ) : (
                  <Link
                    state={{
                      duration: location.state.data.duration,
                      examTime: location.state.data.examTime,
                    }}
                    to={`${`/revision_and_exam/exam_page/${location.state.data.paperId}`}`}
                  >
                    <BasicButton
                      text={"START"}
                      disable={allow > 0 ? true : false}
                    />
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const TimesUpDialog = ({ openDialog }) => {
  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  return (
    <Dialog
      open={openDialog}
      keepMounted
      TransitionComponent={Transition}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Time is up</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          exam time is up
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button>Go Back</Button>
      </DialogActions>
    </Dialog>
  );
};

export default StartExam;
