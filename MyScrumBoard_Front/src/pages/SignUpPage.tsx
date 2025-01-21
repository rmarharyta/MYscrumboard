import { useState } from "react";
import { Box, Link } from "@mui/material";
import UserName from "../components/UserName";
import WelcomeText from "../components/WelcomeText";
import SignUpButton from "../components/SignUpButton";
import PasswordRegister from "../components/PasswordRegister";

function SignUpPage() {
  const [username, setUsername] = useState<string>("");
  const handleUsername = (newValue: string) => setUsername(newValue);

  const [password, setPassword] = useState<string>("");
  const handlePassword = (newValue: string) => setPassword(newValue);

  const [repeatPassword, setRepeadPassword] = useState<string>("");
  const handleRepeatedPassword = (newValue: string) =>
    setRepeadPassword(newValue);

  return (
    //background
    <Box
      sx={{
        overflowY: "auto",
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
          height: "auto",
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
          {/* box login components */}
          <Box
            sx={{
              margin: "85px 16px",
              display: "flex",
              flexDirection: "column",
              gap: "25px",
              width: 592,
              height: 364,
              alignItems: "center",
            }}
          >
            <UserName value={username} onChange={handleUsername} />
            <PasswordRegister
              valueFirst={password}
              valueSecond={repeatPassword}
              onChangeFirst={handlePassword}
              onChangeSecond={handleRepeatedPassword}
            />
            <SignUpButton />
            <Link
              href="#"
              underline="hover"
              color="#440464"
              textAlign={"center"}
              marginTop={"-11px"}
            >
              {"Go back"}
            </Link>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default SignUpPage;
