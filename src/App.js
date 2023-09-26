import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import OnlineExam from "./pages/R&E/OnlineExam";
import StartExam from "./pages/R&E/StartExam";
import ExamPage from "./pages/R&E/ExamPage";
import PageNotFound from "./pages/PageNotFount";
import PersonalRevisionSheet from "./pages/R&E/PersonalRevisionSheet";
import SelectChild from "./pages/SelectChild";
import { useSelector } from "react-redux";
import MarksEntryOverview from "./pages/TeacherMarksEntry/Overview";
import { useLayoutEffect } from "react";
import Cookies from "js-cookie";
import instance from "./instance";
import SubjectMarksEntry from "./pages/TeacherMarksEntry/SubjectMarksEntry";
import Home from "./pages/Home";
import ViewFeedback from "./pages/R&E/Feedback/ViewFeedback";
import ViewAnswerKey from "./pages/R&E/Feedback/ViewAnswer";

function App() {
  const isAuth = useSelector((state) => state.auth.user);
  const client = new QueryClient();
  const queryParameters = new URLSearchParams(window.location.search);
  useLayoutEffect(() => {
    const token = queryParameters.get("auth");
    if (token) {
      const registerToken = async () => {
        const res = await instance({
          url: `v1/login/validateToken`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${token ? token : Cookies.get("token")}`,
          },
        }).catch((err) => console.log(err));
        Cookies.set("user", res.data);
        Cookies.set("token", token);
      };
      registerToken();
    }
  }, []);

  return (
    <div className="font-Roboto">
      <QueryClientProvider client={client}>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                queryParameters.get("auth") ? (
                  <Home />
                ) : isAuth ? (
                  <Home />
                ) : (
                  <Login />
                )
              }
            />
            <Route path="/login" element={<Login />} />

            <Route
              path="/revision_and_exam/online_exam"
              element={
                queryParameters.get("auth") ? (
                  <OnlineExam />
                ) : isAuth ? (
                  <OnlineExam />
                ) : (
                  <Login />
                )
              }
            />
            <Route
              path="/marks_entry/overview"
              element={
                queryParameters.get("auth") ? (
                  <MarksEntryOverview />
                ) : isAuth ? (
                  <MarksEntryOverview />
                ) : (
                  <Login />
                )
              }
            />
            <Route
              path="/marks_entry/subject_marks_entry"
              element={
                queryParameters.get("auth") ? (
                  <SubjectMarksEntry />
                ) : isAuth ? (
                  <SubjectMarksEntry />
                ) : (
                  <Login />
                )
              }
            />
            <Route
              path="/revision_and_exam/start_exam"
              element={
                queryParameters.get("auth") ? (
                  <StartExam />
                ) : isAuth ? (
                  <StartExam />
                ) : (
                  <Login />
                )
              }
            />
            <Route
              path="/revision_and_exam/exam_page/:id"
              element={
                queryParameters.get("auth") ? (
                  <ExamPage />
                ) : isAuth ? (
                  <ExamPage />
                ) : (
                  <Login />
                )
              }
            />
            <Route
              path="/select_child"
              element={
                queryParameters.get("auth") ? (
                  <SelectChild />
                ) : isAuth ? (
                  <SelectChild />
                ) : (
                  <Login />
                )
              }
            />
            <Route
              path="/revision_and_exam/prs"
              element={
                queryParameters.get("auth") ? (
                  <PersonalRevisionSheet />
                ) : isAuth ? (
                  <PersonalRevisionSheet />
                ) : (
                  <Login />
                )
              }
            />
            {/* feedback routes */}
            <Route
              path="/feedback/view_feedback"
              element={
                queryParameters.get("auth") ? (
                  <ViewFeedback />
                ) : isAuth ? (
                  <ViewFeedback />
                ) : (
                  <Login />
                )
              }
            />
            <Route
              path="/feedback/view_answer_key"
              element={
                queryParameters.get("auth") ? (
                  <ViewAnswerKey />
                ) : isAuth ? (
                  <ViewAnswerKey />
                ) : (
                  <Login />
                )
              }
            />
            <Route
              path="*"
              element={
                queryParameters.get("auth") ? (
                  <PageNotFound />
                ) : isAuth ? (
                  <PageNotFound />
                ) : (
                  <Login />
                )
              }
            />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </div>
  );
}

export default App;
