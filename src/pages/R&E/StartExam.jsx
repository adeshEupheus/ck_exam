import React, { useEffect, useRef } from "react";
import { useState } from "react";
import Sidebar from "../../Components/Sidebar";

import SwipeableTemporaryDrawer from "../../Components/Material/MaterialSidebar";
import { Menu } from "@mui/icons-material";
import {  useQuery } from "@tanstack/react-query";

import Snackbars from "../../Components/Material/Snackbar";
import Loader from "../../Components/Material/Loader";
import { GetOnlineExamData } from "../../apis/fetcher/GetOnlineExamData";
import BasicButton from "../../Components/Material/Button";

const StartExam = () => {
  const [id, setId] = useState("FA1");
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState("");
  const [snackbarErr, setSnackbarErr] = useState(false);

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
      console.log(data);
    },
    refetchOnWindowFocus: false,
  });

  console.log(OnlineExamData);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  //   const lockMutation = useMutation({
  //     mutationFn: async (data) => {
  //       console.log(data);
  //       setLoading(true);
  //       let res;
  //       let index;
  //       if (data.item) {
  //         if (!data.item.locked) {
  //           res = await LockExamSetup(data.examType, data.gradeId, data.data);
  //         } else {
  //           res = await UnLockExamSetup(data.examType, data.gradeId);
  //         }
  //       } else {
  //         res = await LockExamSetup(data.examType, data.gradeId, data.data);
  //       }
  //       if (res.success) {
  //         refetch();
  //         setSnackbarErr(false);
  //         if (data.item) {
  //           index = Exam_setUpData.indexOf(data.item);
  //         }
  //         setSnackbarMsg(res.message.replace(/<b>/g, " ").replace("</b>", " "));
  //         snackbarRef.current.openSnackbar();
  //         setLoading(false);
  //         if (data.item) {
  //           switchRefs.current[index].toggle();
  //         }
  //       } else {
  //         setSnackbarErr(true);
  //         setSnackbarMsg(res.message.replace(/<b>/g, " ").replace("</b>", " "));
  //         snackbarRef.current.openSnackbar();
  //         setLoading(false);
  //       }
  //     },
  //   });

  const show = null;

 

  

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
            <div className="flex flex-col px-6 cursor-pointer py-8 items-end gap-[1px] ">
              <span>Time Remaining</span>
              <span>50:00</span>
              {/* <span><CountDown duration={2*24*60*60}/></span> */}
            </div>
          </div>

          <div className="relative flex flex-col w-full justify-center items-start gap-4 bg-gray-200">
            <div className="sm:px-16 px-4 w-full flex flex-col gap-4 mb-4">
            
              <h1 className="text-slate-400 sm:text-2xl text-xl">ENGLISH-RSA1</h1>
              <div>
                <h1 className="font-semibold sm:text-xl">1.GET READY</h1>
                <p className="text-sm"> a ) You need good internet and a fully-charged laptop OR phone</p>
                <p className="text-sm">b ) Open the learning APP on your mobile OR on the chrome tab on your laptop</p>
              </div>

              <div>
                <h1 className="font-semibold  sm:text-xl ">2.START!</h1>
                <p className="text-sm "> a ) Click START.Do NOT refresh.</p>
                <p className="text-sm">b ) Click on the drop-down menu to see the options</p>
                <p className="text-sm">c ) Choose the option you think is correct</p>

              </div>
              <div>
                <h1 className="font-semibold  sm:text-xl">3.CHECK YOUR ANSWERS!</h1>
                <p className="text-sm"> a ) Click on the &#9633; button on top right of your screen to check how many questions you have completed.</p>
                <p className="text-sm">b ) Review answers before you submit</p>
                <p className="text-sm">c ) Finish within the time limit</p>

              </div>
              <div className="w-full flex flex-col gap-3 items-center justify-center">
              <div><h1 className="font-semibold  sm:text-2xl text-xl ml-30"> ALL THE BEST!!</h1></div>
               <div><p> Exam start time is : 15:36:00</p></div>
               <BasicButton text={"START"}/>
               `</div>



              
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StartExam;
