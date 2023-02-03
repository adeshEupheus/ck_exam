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
  return (
    <div className="font-Roboto">
      <QueryClientProvider client={client}>
        <BrowserRouter>
          <Routes>
            <Route
              path="/login"
              element={isAuth ? <OnlineExam /> : <Login />}
            />
            <Route path="/" element={isAuth ? <OnlineExam /> : <Login />} />
            <Route
              path="/revision_and_exam/online_exam"
              element={isAuth ? <OnlineExam /> : <Login />}
            />
            <Route
              path="/revision_and_exam/start_exam"
              element={isAuth ? <StartExam /> : <Login />}
            />
            <Route
              path="/revision_and_exam/exam_page/:id"
              element={isAuth ? <ExamPage /> : <Login />}
            />
            <Route
              path="/select_child"
              element={isAuth ? <SelectChild /> : <Login />}
            />
            <Route
              path="/revision_and_exam/prs"
              element={isAuth ? <PersonalRevisionSheet /> : <Login />}
            />
            <Route path="*" element={isAuth ? <PageNotFound /> : <Login />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </div>
  );
}

export default App;
