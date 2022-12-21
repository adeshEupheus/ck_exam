import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import OnlineExam from "./pages/R&E/OnlineExam";
import StartExam from "./pages/R&E/StartExam";

function App() {
  const client = new QueryClient();
  return (
    <div className="font-Roboto">
      <QueryClientProvider client={client}>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Login />} />
            <Route
              path="/revision_and_exam/online_exam"
              element={<OnlineExam />}
            />
            <Route path="*" element={<h1>Page Not Found ... 404</h1>} />
            <Route path="/revision_and_exam/start_exam" element={<StartExam />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </div>
  );
}

export default App;
