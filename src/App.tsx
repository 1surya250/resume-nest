
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/layout/layout";
import HomePage from "./pages/HomePage";
import GuidePage from "./pages/GuidePage";
import TestPage from "./pages/TestPage";
import ResumePage from "./pages/ResumePage";
import ResumeTemplatesPage from "./pages/ResumeTemplatesPage";
import CoursesPage from "./pages/CoursesPage";
import InterviewPage from "./pages/InterviewPage";
import JobsPage from "./pages/JobsPage";
import DashboardPage from "./pages/DashboardPage";
import NotFound from "./pages/NotFound";

// Create a client
const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="guide" element={<GuidePage />} />
            <Route path="test" element={<TestPage />} />
            <Route path="resume" element={<ResumePage />} />
            <Route path="resume/templates" element={<ResumeTemplatesPage />} />
            <Route path="courses" element={<CoursesPage />} />
            <Route path="interview" element={<InterviewPage />} />
            <Route path="jobs" element={<JobsPage />} />
            <Route path="dashboard" element={<DashboardPage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
