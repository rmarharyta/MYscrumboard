import { useState } from "react";
import { Box, Link, useMediaQuery, useTheme } from "@mui/material";
import UserName from "../components/UserName";
import WelcomeText from "../components/WelcomeText";
import SignUpButton from "../components/SignUpButton";
import PasswordRegister from "../components/PasswordRegister";

function SignUpPage() {
  const [username, setUsername] = useState<string>("");
  const handleUsername = (newValue: string) => setUsername(newValue);

  const [password, setPassword] = useState<string>("");
  const handlePassword = (newValue: string) => setPassword(newValue);

  const [repeatPassword, setRepeatPassword] = useState<string>("");
  const handleRepeatedPassword = (newValue: string) =>
    setRepeatPassword(newValue);

  const [isSubmitted, setIsSubmitted] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Функція перевірки валідності пароля
  const isValidPassword = (password: string) => {
    return (
      password.length >= 6 && /\d/.test(password) && /[A-Z]/.test(password)
    );
  };

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Простий регулярний вираз для перевірки email
    return emailRegex.test(email);
  };
  // Визначаємо, чи кнопка має бути заблокована
  const isButtonDisabled =
    !isValidEmail(username) || !isValidPassword(password);

  return (
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
      {/* <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "90vw",
          maxWidth: "600px",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#FFFFFFCC",
          borderRadius: isMobile ? "30px" : "60px",
          padding: isMobile ? "20px" : "40px",
        }}
      > */}
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
            <PasswordRegister
              valueFirst={password}
              valueSecond={repeatPassword}
              onChangeFirst={handlePassword}
              onChangeSecond={handleRepeatedPassword}
              isSubmitted={isSubmitted}
            />
          </Box>
          <SignUpButton
            email={username}
            password={password}
            setIsSubmitted={setIsSubmitted}
            isDisabled={isButtonDisabled}
          />
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

export default SignUpPage;
