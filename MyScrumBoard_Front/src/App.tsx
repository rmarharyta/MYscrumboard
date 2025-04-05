import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import RequestChangePassword from "./pages/RequestChangePassword";
import ChangePassword from "./pages/ChangePassword";
import DashboardPage from "./pages/DashboardPage";
import { Box } from "@mui/material";
import { SingedIn, SingedOut } from "./utils/Contexts/UserContext";
import AppBar from "./components/AppBar";
import ScrumsPage from "./pages/ScrumsPage";
import ScrumBoardPage from "./pages/ScrumBoardPage";

function App() {
  return (
    <Box>
      <BrowserRouter>
        <SingedOut>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route
              path="/requestchangepassword"
              element={<RequestChangePassword />}
            />
            <Route path="/changepassword" element={<ChangePassword />} />
          </Routes>
        </SingedOut>
        <SingedIn>
          <AppBar />
          <Box sx={{ mt: 10 }}>
            <Routes>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/scrum/:projectId" element={<ScrumsPage />} />
              <Route
                path="/scrumboard/:scrumId/:ownerId"
                element={<ScrumBoardPage />}
              />
            </Routes>
          </Box>
        </SingedIn>
      </BrowserRouter>
    </Box>
  );
}

export default App;
