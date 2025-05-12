import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import RequestChangePassword from "./pages/RequestChangePassword";
import ChangePassword from "./pages/ChangePassword";
import DashboardPage from "./pages/DashboardPage";
import { Box } from "@mui/material";
import { SingedIn as ProtectedRoute, SingedOut as PublicRoute } from "./utils/Contexts/UserContext";
import AppBar from "./components/AppBar";
import ScrumsPage from "./pages/ScrumsPage";
import ScrumBoardPage from "./pages/ScrumBoardPage";
import useAuth from "./utils/Contexts/useAuth";

function App() {
  const { userId } = useAuth();
  return (
    <Box>
      <BrowserRouter>
        {userId && <AppBar />}
        <Box sx={userId ? { mt: 10 } : {}}>
          <Routes>
            <Route
              path="/"
              element={<PublicRoute><LoginPage /></PublicRoute>}
            />
            <Route
              path="/signup"
              element={<PublicRoute><SignUpPage /></PublicRoute>}
            />
            <Route
              path="/requestchangepassword"
              element={<PublicRoute><RequestChangePassword /></PublicRoute>}
            />
            <Route
              path="/changepassword/:resettoken"
              element={<PublicRoute><ChangePassword /></PublicRoute>}
            />
            {/* <Route path="/changepassword" element={<Navigate to={'/'} replace />} /> */}

            <Route
              path="/dashboard"
              element={<ProtectedRoute><DashboardPage /></ProtectedRoute>}
            />
            <Route
              path="/scrum/:projectId"
              element={<ProtectedRoute><ScrumsPage /></ProtectedRoute>}
            />
            <Route
              path="/scrumboard/:scrumId/:ownerId"
              element={<ProtectedRoute><ScrumBoardPage /></ProtectedRoute>}
            />

            <Route
              path="/"
              element={
                userId ? (
                  <Navigate to="/dashboard" replace />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Box>
      </BrowserRouter>
    </Box>
  );
}

export default App;
