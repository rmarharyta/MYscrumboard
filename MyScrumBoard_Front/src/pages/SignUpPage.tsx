import { useState } from "react";
import { Box, Link, useMediaQuery, useTheme } from "@mui/material";
import WelcomeText from "../components/WelcomeText";
<<<<<<< Updated upstream
import SignUpButton from "../components/SignUpButton";
import PasswordRegister from "../components/PasswordRegister";
=======
import Button from "../components/Button";
import { NavLink, useNavigate } from "react-router-dom";
import useAuth from "../utils/Contexts/useAuth";
import { useMutation } from "@tanstack/react-query";
import InputField from "../components/InputField";
import { isValidEmail, isValidPassword } from "../utils/commonFunctions";
>>>>>>> Stashed changes

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
  // Визначаємо, чи кнопка має бути заблокована
  const isButtonDisabled =
    !isValidEmail(username) || !isValidPassword(password);
=======
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setRepeatPassword] = useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const auth = useAuth();
  const navigate = useNavigate();


  const handleSignUp = () => {
    setIsSubmitted(true);
    if (!isValidEmail(username)) {
      setError("Please enter a valid email address");
      return;
    }
    if (!isValidPassword(password)) {
      setError("Password must be at least 6 characters long, contain at least one digit and one uppercase letter.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    mutate();
    setIsSubmitted(false);
    setError(null);
  };


  const { mutate, isPending } = useMutation({
    mutationFn: async () => auth.signup(username, password),
    onSuccess: () => {
      navigate("/dashboard");
    },
    onError: () => {
      setError("Something went wrong, try again later.");
    },
  });
>>>>>>> Stashed changes

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
<<<<<<< Updated upstream
            <PasswordRegister
              valueFirst={password}
              valueSecond={repeatPassword}
              onChangeFirst={handlePassword}
              onChangeSecond={handleRepeatedPassword}
=======
            <InputField
              id="password"
              value={password}
              onChange={setPassword}
>>>>>>> Stashed changes
              isSubmitted={isSubmitted}
              type="password"
              label="Password"
              validate={isValidPassword}
              isMobile={isMobile}
            />
<<<<<<< Updated upstream
=======
            <InputField
              id="confirmPassword"
              value={confirmPassword}
              onChange={setRepeatPassword}
              isSubmitted={isSubmitted}
              type="password"
              label="Confirm Password"
              validate={() => confirmPassword === password}
              isMobile={isMobile}
            />
>>>>>>> Stashed changes
          </Box>
          <Button
            action={handleSignUp}
            isPending={isPending}
            error={error}
            setError={setError}
            label="Sign up"
            variant="contained"

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
