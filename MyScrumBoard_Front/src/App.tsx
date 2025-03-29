import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import RequestChangePassword from "./pages/RequestChangePassword";
import ChangePassword from "./pages/ChangePassword";
import DashboardPage from "./pages/DashboardPage";
import { Box } from "@mui/material";
import { SingedIn, SingedOut } from "./utils/Contexts/UserContext";

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
          <Box sx={{ mt: 10 }}>
            <Routes>
              <Route path="/dashboard" element={<DashboardPage />} />
            </Routes>
          </Box>
        </SingedIn>
      </BrowserRouter>
    </Box>
  );
}

export default App;
