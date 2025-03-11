import { useState } from "react";
import { Box, Link, useMediaQuery, useTheme } from "@mui/material";
import UserName from "../components/UserName";
import WelcomeText from "../components/WelcomeText";
import SendRequestButton from "../components/SendRequestButton";

function RequestChangePassword() {
  
  const [username, setUsername] = useState<string>("");
  const handleUsername = (newValue: string) => setUsername(newValue);

  const [isSubmitted, setIsSubmitted] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    //background
    <Box
      width={1}
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#E6DFFF",
      }}
    >
      {/* Білий контейнер */}
      <Box
        sx={{
          display: "flex",
          width: "90vw",
          maxWidth: "700px",
          justifyContent: "center",
          backgroundColor: "#FFFFFFCC",
          borderRadius: isMobile ? "30px" : "60px",
          padding: isMobile ? "20px" : "40px",
        }}
      >
        {/* бокс з компонентами */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            maxWidth: "100%",
            alignItems: "center",
            rowGap: isMobile ? 1.5 : 2,
          }}
        >
          <WelcomeText />
          {/* Поля введення */}
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              rowGap: isMobile ? 1.5 : 2,
              flexDirection: "column",
            }}
          >
            <UserName
              value={username}
              onChange={handleUsername}
              isSubmitted={isSubmitted}
            />
          </Box>
          <SendRequestButton email={username} setIsSubmitted={setIsSubmitted} />
          <Link
            textAlign={"center"}
            width={1}
            href="/"
            underline="hover"
            color="#440464"
            fontSize={isMobile ? "12px" : "16px"}
          >
            {"Go back"}
          </Link>
        </Box>
      </Box>
    </Box>
  );
}

export default RequestChangePassword;
