import React, { useEffect, useLayoutEffect, useRef } from "react";
import { useState } from "react";
import { Menu, Minimize, PanToolAlt } from "@mui/icons-material";
import { useMutation, useQuery } from "@tanstack/react-query";
import Snackbars from "../../Components/Material/Snackbar";
import Loader from "../../Components/Material/Loader";
import { GetExamQuestionData } from "../../apis/fetcher/GetExamQuestionData";
import { getQuestionData } from "../../apis/fetcher/GetQuestion";
import {
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Skeleton,
  Slide,
} from "@mui/material";
import Button from "@mui/material/Button";
import {
  Link,
  useLocation,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { SetAnswer } from "../../apis/mutation/setAnswer";
import QuestionSidebar from "../../Components/Material/QuestionSidebar";
import Cookies from "js-cookie";
let Logo = require("../../assets/classklap_logo.png");

const ExamPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const [questionId, setQuestioinId] = useState(null);
  const [showReview, setShowReview] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [minutes, setMinutes] = useState(null);
  const [seconds, setSeconds] = useState(null);
  const [attempted, setAttempted] = useState([]);

  const [queryParameters] = useSearchParams();
  const returnToken = () => {
    return queryParameters.get("auth");
  };

  useLayoutEffect(() => {
    if (queryParameters.get("auth")) {
      Cookies.set("token", queryParameters.get("auth"));
    }
  }, []);

  const sidebarRef = useRef();
  // console.log(location);
  const mutation = useMutation({
    mutationFn: async (data) => {
      await SetAnswer(
        data.id,
        data.questionId,
        data.qId,
        data.answer,
        returnToken()
      );
    },
  });

  const {
    data: ExamQuestionData,
    isLoading,
    refetch,
    isRefetching,
  } = useQuery({
    queryKey: ["all_questions"],
    queryFn: () => GetExamQuestionData(id, returnToken()),
    cacheTime: 0,
    onSuccess: (data) => {
      setQuestioinId(data.questionAttempts[0]);
    },
    refetchOnWindowFocus: false,
  });

  const {
    data: QuestionData,
    isLoading: isQuestionLoading,
    refetch: refetchQuestion,
    // isRefetching,
  } = useQuery({
    queryKey: ["question_data", questionId],
    queryFn: () => getQuestionData(id, questionId, returnToken()),
    cacheTime: 0,
    // enabled: !!questionId,
    onSuccess: (data) => {
      console.log(data);
      // setQuestioinId(data.questionAttempts[0]);
    },
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    document.title = "Exam Set Up - ClassKlap";
    const handleWidth = () => {
      if (window.innerWidth > 1024) {
      } else {
      }
    };
    window.addEventListener("resize", handleWidth);
    handleWidth();
    window.scroll(0, 0);

    return () => {
      window.removeEventListener("resize", handleWidth);
    };
  }, []);

  const setAnswer = (qId, answer) => {
    mutation.mutate({ id, questionId, qId, answer });
  };

  const changeQuestion = (type) => {
    // console.log(Number(QuestionData.questionResponse.questionNo) - 1);
    switch (type) {
      case "next":
        setQuestioinId(
          ExamQuestionData.questionAttempts[
            Number(QuestionData.questionResponse.questionNo)
          ]
        );
        break;
      case "prev":
        if (Number(QuestionData.questionResponse.questionNo) === 1) {
          return;
        } else {
          setQuestioinId(
            ExamQuestionData.questionAttempts[
              Number(QuestionData.questionResponse.questionNo) - 2
            ]
          );
        }
        break;

      default:
        break;
    }
  };

  useLayoutEffect(() => {
    let seconds = new Date().getSeconds();
    let currentTime = new Date().getHours() * 60 + new Date().getMinutes();
    let given = location.state.examTime[3] * 60 + location.state.examTime[4];
    let available = location.state.duration + (given - currentTime);
    setMinutes(available - 1);
    setSeconds(60 - seconds);
    // setTimer({ hour: available - 1, seconds: 60 - seconds });
  }, []);

  useEffect(() => {
    let changeTimer;
    // if (timer.hour !== null) {
    changeTimer = setInterval(() => {
      if (seconds === 0 && minutes === 0) {
        clearInterval(changeTimer);

        setOpenDialog(true);
      } else if (seconds === 0) {
        setMinutes(minutes - 1);
        setSeconds(59);
      } else {
        setSeconds(seconds - 1);
      }
    }, 930);
    // }

    return () => {
      clearInterval(changeTimer);
    };
  });

  const GetAttemptedQuestionData = async () => {
    const res = await getQuestionData(id, questionId);
    setAttempted(
      res.questionPaperAttemptReviewResponse.questionsReviewResponses
    );
    setShowReview(true);
  };

  const openSubmitDialog = () => {
    sidebarRef.current.openSubmitDialog();
  };

  const changeQId = (id) => {
    setQuestioinId(id);
    setShowReview(false);
    sidebarRef.current.closeSidebar();
  };

  const handleSidebarCollapsed = async () => {
    const res = await getQuestionData(id, questionId);
    setAttempted(
      res.questionPaperAttemptReviewResponse.questionsReviewResponses
    );
    sidebarRef.current.openSidebar();
  };

  return (
    <>
      <div
        className={`flex flex-col w-full min-h-screen bg-gray-200 relative transition-all overflow-hidden ease-linear duration-300`}
      >
        <QuestionSidebar
          ref={sidebarRef}
          data={attempted}
          changeQId={changeQId}
        />
        <TimesUpDialog openDialog={openDialog} />
        <div className="w-full flex text-sm font-semibold text-gray-600 justify-between">
          <div className="sm:w-auto w-[50%]">
            <img
              src={Logo}
              width="200px"
              height="200px"
              className="p-4  sm:ml-2"
            />
          </div>
          <div className="flex flex-col px-6 py-8 items-end gap-[1px] sm:mr-6 mr-2">
            <span className="sm:text-base text-xs">Time Remaining</span>
            <span className="sm:text-base text-xs">
              {String(minutes).padStart(2, "0")}m:
              {String(seconds).padStart(2, "0")}s
            </span>
            <Button
              size="small"
              className="!bg-blue-500 !font-semibold !text-white !mt-3"
              onClick={handleSidebarCollapsed}
            >
              MCQs Done
            </Button>
          </div>
        </div>

        <div className="relative flex flex-col w-full justify-center items-start sm:mt-20 mt-10 gap-4 ">
          <div className="sm:px-16 px-4 w-full flex flex-col gap-4 mb-4">
            {isQuestionLoading ? (
              <>
                <Skeleton
                  animation="wave"
                  variant="text"
                  sx={{ fontSize: "2rem", width: "10rem" }}
                />
                <Skeleton
                  animation="wave"
                  variant="text"
                  sx={{ fontSize: "1rem", width: "15rem" }}
                />
                <Skeleton
                  animation="wave"
                  variant="text"
                  sx={{ fontSize: "1rem", width: "3rem" }}
                />
                <Skeleton
                  animation="wave"
                  variant="text"
                  sx={{ fontSize: "1rem", width: "5rem" }}
                />
              </>
            ) : (
              <>
                <h1 className="text-slate-500 font-semibold sm:text-2xl text-xl">
                  ENGLISH-RSA1
                </h1>

                {!showReview ? (
                  <>
                    <p className="text-slate-400">
                      {QuestionData.questionResponse.instructions} (
                      {QuestionData.questionResponse.marks} Marks)
                    </p>
                    <p className="text-slate-400 ">
                      Question {QuestionData.questionResponse.questionNo} of{" "}
                      {ExamQuestionData.questionAttempts.length}
                    </p>
                    <p className="text-slate-400">
                      {QuestionData.questionResponse.questionTypeName}
                    </p>
                  </>
                ) : (
                  <p className="text-slate-500 text-xl font-semibold">Review</p>
                )}
              </>
            )}
            {showReview ? (
              <ReviewQuestions
                data={attempted}
                changeQId={changeQId}
                openSubmitDialog={openSubmitDialog}
              />
            ) : isQuestionLoading ? (
              <Skeleton
                animation="wave"
                variant="rectangular"
                sx={{ width: "90vw", height: "15rem" }}
              />
            ) : (
              <>
                {QuestionData.questionResponse.qType === "RC" ? (
                  <>
                    <div className=" w-50 max-h-[80vh] flex flex-col gap-6 overflow-auto border-4 sm:p-8 px-2 py-4  border-yellow-300 rounded-lg shadow-red-400 shadow-2xl sm:m-2">
                      {/* < span className="inline grid grid-cols-2 gap-4"> */}
                      <div
                        dangerouslySetInnerHTML={{
                          __html: QuestionData.questionResponse.questionText,
                        }}
                      ></div>
                      {/* <div className="flex flex-col gap-3 w-full">
                        <p>1) How many Children are swimming?</p>
                        <div className="grid sm:grid-cols-2 sm:grid-rows-2 grid-cols-1 gap-4">
                          {Options.map((item, index) => {
                            return (
                              <Card
                                className={`!transition-all !mx-4 !p-4 !duration-200 !ease-linear ${
                                  active === index
                                    ? "!bg-purple-400"
                                    : "!bg-slate-100"
                                }`}
                                key={index}
                                onClick={() => setactive(index)}
                              >
                                {item}
                              </Card>
                            );
                          })}
                        </div>
                      </div> */}
                      {QuestionData.questionResponse.mcqQuestionInfoResponses.map(
                        (item, index) => {
                          return (
                            <Mcq
                              data={item}
                              setAnswer={setAnswer}
                              IDs={{ id, questionId }}
                            />
                          );
                        }
                      )}
                    </div>
                  </>
                ) : (
                  <div className=" w-50 max-h-[80vh] flex flex-col gap-6 overflow-auto border-4 sm:p-8 px-2 py-4 border-yellow-300 rounded-lg shadow-red-400 shadow-2xl sm:m-2">
                    <Mcq
                      data={QuestionData.questionResponse}
                      setAnswer={setAnswer}
                      IDs={{ id, questionId }}
                    />
                  </div>
                )}
              </>
            )}

            {showReview ? null : (
              <div className="mt-4 flex w-full gap-3 justify-end pr-4">
                {/* <Stack spacing={5} direction="row" > */}
                <div onClick={() => changeQuestion("prev")}>
                  <Button
                    disabled={
                      ExamQuestionData?.questionAttempts[0] === questionId
                    }
                    variant="contained"
                    className="!font-semibold"
                  >
                    Previous
                  </Button>
                </div>
                {ExamQuestionData?.questionAttempts[
                  ExamQuestionData?.questionAttempts?.length - 1
                ] === questionId ? (
                  <div onClick={() => GetAttemptedQuestionData()}>
                    <Button className="!font-semibold" variant="contained">
                      Next
                    </Button>
                  </div>
                ) : (
                  <div onClick={() => changeQuestion("next")}>
                    <Button className="!font-semibold" variant="contained">
                      Next
                    </Button>
                  </div>
                )}
                {/* </Stack> */}
              </div>
            )}
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
        <Link to="/revision_and_exam/online_exam">
          <Button>Go Back</Button>
        </Link>
      </DialogActions>
    </Dialog>
  );
};

const ReviewQuestions = ({ data, changeQId, openSubmitDialog }) => {
  const ArrayWithNo = data.map((item, index) => {
    return {
      qNo: index + 1,
      questionAttemptId: item.questionAttemptId,
      isAnswered: item.isAnswered,
    };
  });
  // console.log(ArrayWithNo);
  return (
    <>
      <h1 className="!mt-3 !font-extrabold text-lg text-pink-600">
        {" "}
        NOT ANSWERED
      </h1>

      <div className="relative w-fit">
        <PanToolAlt className="!text-[3rem] !text-gray-600 !absolute !-rotate-45 !top-7 -right-16" />
      </div>
      <div className="flex">
        <div className="!w-[3rem] !h-[3rem] !p-3 !m-3 !bg-pink-600 !text-gray-200 mb-2 rounded-md">
          Q.1
        </div>
        <p className="m-4">
          Tap the question number to <b>add</b> your answers before submitting
        </p>
      </div>

      <div className="flex flex-wrap">
        {ArrayWithNo.map((item) => {
          if (!item.isAnswered) {
            return (
              <div onClick={() => changeQId(item.questionAttemptId)}>
                <Card2 item={item.qNo} bgColor={"pink"} />
              </div>
            );
          }
        })}
      </div>

      <div>
        <h1 className="!mt-3 !font-extrabold text-lg text-green-500">
          ANSWERED
        </h1>

        <div className="relative w-fit">
          <PanToolAlt className="!text-[3rem] !text-gray-600 !absolute !-rotate-45 !top-7 -right-16" />
        </div>
        <div className="flex">
          <div className="!w-[3rem] !h-[3rem] !p-3 !mt-2 !ml-3 !bg-green-500 !text-gray-200 rounded-md">
            Q.1
          </div>
          <p className="m-4">
            Tap the question number to <b>check</b> your answers before
            submitting
          </p>
        </div>
        <div className="flex flex-wrap mt-4">
          {ArrayWithNo.map((item) => {
            if (item.isAnswered) {
              return (
                <div onClick={() => changeQId(item.questionAttemptId)}>
                  <Card2 item={item.qNo} />
                </div>
              );
            }
          })}
        </div>
      </div>
      <div
        onClick={() => openSubmitDialog()}
        className="flex justify-center items-center mt-4"
      >
        <Button variant="contained">Submit</Button>
      </div>
    </>
  );
};

const Card2 = ({ item, bgColor }) => {
  return (
    <Card
      variant="outlined"
      className={`!p-2 !m-1 ${
        bgColor ? "!bg-pink-600" : "!bg-green-700"
      } font-medium !cursor-pointer !text-gray-100`}
    >
      Q.{item}
    </Card>
  );
};

const Mcq = ({ data, setAnswer, IDs }) => {
  // console.log(IDs);
  const [active, setactive] = useState(
    data?.answerByStudent ? Number(data.answerByStudent) - 1 : []
  );

  const handleClick = async (index, answer) => {
    const res = await getQuestionData(IDs.id, IDs.questionId);
    setactive(index);
    if (res.questionResponse.qType === "RC") {
      console.log(res);
      let newAnswer = {};
      res.questionResponse.mcqQuestionInfoResponses.map((item) => {
        if (item.answerByStudent) {
          let questionId = item.questionId;
          let answerByStudent = item.answerByStudent;
          newAnswer[questionId] = answerByStudent.toString();
        }
      });
      newAnswer[data?.questionId] = answer.toString();
      console.log(newAnswer);
      setAnswer(res?.questionResponse?.questionId, newAnswer);
    } else {
      setAnswer(data?.questionId, answer);
    }
  };

  return (
    <div className="flex flex-col gap-3 w-full">
      <div className="flex gap-2">
        <p className="font-bold">{data.questionNo})</p>
        <div
          dangerouslySetInnerHTML={{
            __html: data.questionText,
          }}
        ></div>
      </div>
      <div className="grid sm:grid-cols-2 sm:grid-rows-2 grid-cols-1 gap-4">
        {data?.mcqQuestionChoiceGroupResponses?.map((item, index) => {
          return (
            <Card
              className={`!transition-all !mx-4 !p-4 !duration-200 !cursor-pointer !ease-linear ${
                active === index ? "!bg-purple-400" : "!bg-slate-100"
              }`}
              key={index}
              onClick={() => handleClick(index, item.position)}
            >
              <div className="flex gap-2">
                <p className="font-bold">{index + 1}.</p>

                <div
                  dangerouslySetInnerHTML={{
                    __html: item.content,
                  }}
                ></div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default ExamPage;
