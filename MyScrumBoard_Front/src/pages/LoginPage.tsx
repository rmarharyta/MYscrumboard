import { useState } from "react";
import { Box, Link } from "@mui/material";
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
          width: "880px",
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
            <Link
              href="/requestchangepassword"
              underline="hover"
              color="#440464"
              textAlign={"right"}
              marginTop={"-11px"}
              paddingLeft={"449px"}
            >
              {"Forgot password?"}
            </Link>
            <LogInButton
              email={username}
              password={password}
              setIsSubmitted={setIsSubmitted}
            />
            <SignUpLinkButton />
          </Box>
        </Box>
        <Link
          href="#"
          underline="none" // Прибрати підкреслення
          sx={{
            display: "flex", // Для вирівнювання тексту та іконки
            alignItems: "center", // Вирівнювання по вертикалі
            color: "#000000", // Чорний колір тексту
            textAlign: "center",
            fontFamily: "Poppins, sans-serif",
            fontSize: "20px",
            fontWeight: 400,
            marginTop: "-80px",
            marginBottom: "70px",
            textDecoration: "none", // Забезпечення відсутності підкреслення
            "&:hover": {
              textDecoration: "underline", // Підкреслення при наведенні
            },
          }}
        >
          <Box
            component="img"
            src="src/assets/png-transparent-google-logo-google-search-meng-meng-company-text-logo-thumbnail.png" // Шлях до логотипу
            alt="Google logo"
            sx={{
              width: "50px", // Розмір логотипу
              height: "50px",
              marginRight: "8px", // Відступ між логотипом і текстом
            }}
          />
          Continue with Google
        </Link>
      </Box>
    </Box>
  );
}

export default LoginPage;
