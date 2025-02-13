import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import RequestChangePassword from "./pages/RequestChangePassword";
import ChangePassword from "./pages/ChangePassword";
import DashboardPage from "./pages/DashboardPage";
import AppBar from "./components/AppBar";
import { Box} from "@mui/material";

function App() {
  return (
    <>
      <Box sx={{ mt: 6 }}>
        <AppBar />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route
              path="/requestchangepassword"
              element={<RequestChangePassword />}
            />
            <Route path="/changepassword" element={<ChangePassword />} />
            <Route path="/dashboard" element={<DashboardPage />} />
          </Routes>
        </BrowserRouter>
      </Box>
    </>
  );
}

export default App;
