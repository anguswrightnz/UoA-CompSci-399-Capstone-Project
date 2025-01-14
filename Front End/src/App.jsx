import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AdminLoginComponents } from "./pages/AdminLogin";
import Landing from "./pages/Landing";
import Presurvey from "./pages/PreSurvey";
import { ClinicianSignComponents } from "./pages/ClinicianSign";
import AClinicianSearch from "./pages/AClinicianSearch";
import QuizDashboard from "./pages/QuizDashboard";
import AClinicianProfile from "./pages/AClinicianProfile";
import AdminSetting from "./pages/AdminSettings";
import QuizCreation from "./pages/CreatingQuiz";
import Quiz from "./pages/Quiz";
import CreatingQuiz from "./pages/CreatingQuestions";
import AClinicianMyProfile from "./pages/ClinicianMyProfile";
import EditQuiz from "./pages/AEditQuiz";
import AdminStatsReview from "./pages/AStatistics";
import PasswordReset from "./pages/PasswordReset";
import PasswordCode from "./pages/PasswordCode";
import PasswordSubmit from "./pages/PasswordSubmit";
import NotFoundPage from "./pages/NotFoundPage";

const getAdminToken = () => sessionStorage.getItem("adminToken");

// ProtectedRoute component to protect admin-only routes
const ProtectedRoute = ({ element, ...props }) => {
  // Check if token exists
  const adminToken = getAdminToken();
  if (!adminToken) {
    // Redirect to admin login page if token is not present
    return <Navigate to="/adminlogin" />;
  }
  // Render the provided element if token exists
  return React.cloneElement(element, props);
};

const getClinicianToken = () => sessionStorage.getItem("cliniciantoken");

const ClinicianProtectedRoute = ({ element, ...props }) => {
  const cliniciantoken = getClinicianToken();
  if (!cliniciantoken) {
    return <Navigate to="/cliniciansign" />;
  }
  return React.cloneElement(element, props);
};
function App() {
  console.log("Rendering App component");
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<Landing />} />
          <Route path="/home" element={<Landing />} />
          <Route path="/adminlogin" element={<AdminLoginComponents />} />
          <Route path="/registration" element={<Presurvey />} />
          <Route path="/cliniciansign" element={<ClinicianSignComponents />} />
          <Route path="*" element={<NotFoundPage />} />

          <Route path="/passwordreset" element={<PasswordReset />} />

          <Route path="/passwordcode" element={<PasswordCode />} />

          <Route path="/passwordsubmit" element={<PasswordSubmit />} />


          <Route
            path="/createquestion"
            element={<ProtectedRoute element={<CreatingQuiz />} />}
          />
          <Route
            path="/createquiz"
            element={<ProtectedRoute element={<QuizCreation />} />}
          />
          <Route
            path="/adminSettings"
            element={<ProtectedRoute element={<AdminSetting />} />}
          />

          <Route
            path="/adminStats"
            element={<ProtectedRoute element={<AdminStatsReview  />} />}
          />

          <Route
            path="/quizDashboard"
            element={<ClinicianProtectedRoute element={<QuizDashboard />} />}
          />

          <Route
            path="/clinicianProfile"
            element={
              <ClinicianProtectedRoute element={<AClinicianMyProfile />} />
            }
          />

          <Route
            path="/adminsearch"
            element={<ProtectedRoute element={<AClinicianSearch />} />}
          />
          <Route
            path="/createquiz/:moduleID"
            element={<ProtectedRoute element={<QuizCreation />} />}
          />

          <Route
            path="/EditQuiz"
            element={<ProtectedRoute element={<EditQuiz />} />}
          />

          <Route
            path="/createquestion/:moduleID"
            element={<ProtectedRoute element={<CreatingQuiz mode="add" />} />}
          />

          <Route
            path="/createquestion/:moduleID/:questionID"
            element={<ProtectedRoute element={<CreatingQuiz mode="edit" />} />}
          />

          <Route
            path="/clinician/:clinicianId"
            element={<ProtectedRoute element={<AClinicianProfile />} />}
          />
          
          <Route path="/passwordreset" element={<PasswordReset />} />

          <Route path="/passwordcode" element={<PasswordCode />} />

          <Route path="/passwordsubmit" element={<PasswordSubmit />} />
          
          
          <Route
            path="/quiz/:quizID/:moduleID"
            element={<ClinicianProtectedRoute element={<Quiz />} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
