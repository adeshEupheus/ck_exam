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

function App() {
  const isAuth = useSelector((state) => state.auth.user);
  const client = new QueryClient();
  const queryParameters = new URLSearchParams(window.location.search);

  return (
    <div className="font-Roboto">
      <QueryClientProvider client={client}>
        <BrowserRouter>
          <Routes>
            <Route
              path="/login"
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
              path="/"
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
