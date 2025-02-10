import { useState } from "react";
import { Box, Link, useMediaQuery, useTheme } from "@mui/material";
import UserName from "../components/UserName";
import Password from "../components/Password";
import WelcomeText from "../components/WelcomeText";
import LogInButton from "../components/LogInButton";
import SignUpLinkButton from "../components/SignUpLinkButton";

function LoginPage() {
  const [username, setUsername] = useState<string>("");
  const handleUsername = (newValue: string) => setUsername(newValue);

  const [password, setPassword] = useState<string>("");
  const handlePassword = (newValue: string) => setPassword(newValue);

  const [isSubmitted, setIsSubmitted] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      width={1}
      height={1}
      sx={{
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
        {/* Блок з компонентами */}
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
            <Password
              value={password}
              onChange={handlePassword}
              isSubmitted={isSubmitted}
            />
          </Box>

          <Link
            textAlign={"right"}
            width={1}
            href="/requestchangepassword"
            underline="hover"
            color="#440464"
            fontSize={isMobile ? "12px" : "16px"}
          >
            {"Forgot password?"}
          </Link>

          <LogInButton
            email={username}
            password={password}
            setIsSubmitted={setIsSubmitted}
          />
          <SignUpLinkButton />

          {/* Кнопка входу через Google */}
          <Link
            href="#"
            underline="hover"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#000000",
              fontFamily: "Poppins, sans-serif",
              fontSize: isMobile ? "12px" : "16px",
              width: isMobile ? "40vw" : "30vw",
              maxWidth: "270px",
            }}
          >
            <Box
              component="img"
              src="src/assets/png-transparent-google-logo-google-search-meng-meng-company-text-logo-thumbnail.png"
              alt="Google logo"
              width={isMobile ? "24px" : "36px"}
            />
            Continue with Google
          </Link>
        </Box>
      </Box>
    </Box>
  );
}

export default LoginPage;
