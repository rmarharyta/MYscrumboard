import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import RequestChangePassword from "./pages/RequestChangePassword";
import ChangePassword from "./pages/ChangePassword";
import DashboardPage from "./pages/DashboardPage";
import AppBar from "./components/AppBar";
import { Box } from "@mui/material";
import useAuth from "./utils/Contexts/useAuth";
import ScrumsPage from "./pages/ScrumsPage";

function App() {
  const { isAuthenticated } = useAuth();
  return (
    <Box>
      <BrowserRouter>
      {isAuthenticated && <AppBar />}
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route
            path="/requestchangepassword"
            element={<RequestChangePassword />}
          />
          <Route path="/changepassword" element={<ChangePassword />} />
        </Routes>
        <Box sx={{ mt: 10 }}>
          <Routes>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/scrum/:projectId" element={<ScrumsPage />}/>
          </Routes>
        </Box>
      </BrowserRouter>
    </Box>
  );
}

export default App;
