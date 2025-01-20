import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import UserName from "../components/UserName";
import Password from "../components/Password";
import WelcomeText from "../components/WelcomeText";

function LoginPage() {
  const [username, setUsername] = useState<string>("");
  const handleUsername = (newValue: string) => setUsername(newValue);

  const [password, setPassword] = useState<string>("");
  const handlePassword = (newValue: string) => setPassword(newValue);

  return (
    //background
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "15px",
        width: "100vw",
        height: "100vh",
        alignItems: "center",
        backgroundColor: "#E6DFFF",
      }}
    >
      {/* білий боксік */}
      <Box
        sx={{
          margin: "72px 280px",
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          width: 880,
          height: 880,
          alignItems: "center",
          backgroundColor: "#FFFFFFCC",
          borderRadius: "60px",
        }}
      >
        {/* бокс з компонентами */}
        <Box
          sx={{
            margin: "115px 128px",
            display: "flex",
            flexDirection: "column",
            gap: "15px",
            width: 624,
            height: 587,
            alignItems: "center",
          }}
        >
          <WelcomeText />

          <UserName value={username} onChange={handleUsername} />
          <Password value={password} onChange={handlePassword} />
        </Box>
      </Box>
    </Box>
  );
}

export default LoginPage;
