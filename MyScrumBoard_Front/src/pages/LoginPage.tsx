import { useEffect, useState } from "react";
import { Box, Link, useMediaQuery, useTheme } from "@mui/material";
import InputField from "../components/InputField";
import WelcomeText from "../components/WelcomeText";
<<<<<<< Updated upstream
import LogInButton from "../components/LogInButton";
import SignUpLinkButton from "../components/SignUpLinkButton";
=======
import { NavLink, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import useAuth from "../utils/Contexts/useAuth";
import { useMutation } from "@tanstack/react-query";
import { isValidEmail, isValidPassword } from "../utils/commonFunctions";
>>>>>>> Stashed changes

function LoginPage() {
  useEffect(() => {
localStorage.removeItem('token')
  }, [])
  
  const [username, setUsername] = useState<string>("");
  const handleUsername = (newValue: string) => setUsername(newValue);

  const [password, setPassword] = useState<string>("");
  const handlePassword = (newValue: string) => setPassword(newValue);

  const [isSubmitted, setIsSubmitted] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

<<<<<<< Updated upstream
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
  
=======

>>>>>>> Stashed changes
  // Визначаємо, чи кнопка має бути заблокована
  const auth = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const loginHendler = () => {
    setIsSubmitted(true);

    if (!isValidEmail(username)) {
      setError("Please enter a valid email address");
      return;
    }
    if (!isValidPassword(password)) {
      setError("Password must be at least 6 characters long, contain at least one digit and one uppercase letter.");
      return;
    }

    mutate();
    setIsSubmitted(false);
    setError(null);
  };

  const { mutate, isPending } = useMutation({
    mutationFn: async () => auth.signin(username, password),
    onSuccess: () => {
      navigate("/dashboard");
    },
    onError: (error) => {
      setError(error.message);
    },
  });

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
            <InputField
              value={username}
              onChange={handleUsername}
              isSubmitted={isSubmitted}
              type="text"
              label="Username"
              validate={isValidEmail}
              isMobile={isMobile}
            />

            <InputField
              value={password}
              onChange={handlePassword}
              isSubmitted={isSubmitted}
              type="password"
              label="Password"
              validate={isValidPassword}
              isMobile={isMobile}
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

          <Button
            action={loginHendler}
            isPending={isPending}
            error={error}
            setError={setError}
            label="Log in"
            variant="contained"
          />
          <Button
            setError={() => { }}
            action={() => navigate("/signup")}
            label="Sign up"
            variant="outlined"
          />

<<<<<<< Updated upstream
          {/* Кнопка входу через Google */}
          <Link
=======
          {/* <Link
>>>>>>> Stashed changes
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
