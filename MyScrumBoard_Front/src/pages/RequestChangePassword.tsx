import { useState } from "react";
import { Box, Link, useMediaQuery, useTheme } from "@mui/material";
<<<<<<< Updated upstream
import UserName from "../components/UserName";
import WelcomeText from "../components/WelcomeText";
import SendRequestButton from "../components/SendRequestButton";

function RequestChangePassword() {
  
=======
import WelcomeText from "../components/WelcomeText";
import { NavLink } from "react-router-dom";
import InputField from "../components/InputField";
import { isValidEmail, isValidPassword } from "../utils/commonFunctions";
import Button from "../components/Button";
import { useMutation } from "@tanstack/react-query";
import { requestResetPassword } from "../utils/api/PasswordService";

function RequestChangePassword() {
>>>>>>> Stashed changes
  const [username, setUsername] = useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);


  const handleUsername = (newValue: string) => setUsername(newValue);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { mutateAsync: requestResetPasswordMutate } = useMutation({
    mutationFn: async (username: string) => await requestResetPassword(username),
    onSuccess: () => {
      console.log("Успішно відправлено!")
    },
    onError: (error) => {
      console.error("Сталася помилка ", error)
    },
  });
  const handleSendRequest = async () => {
    if (username && isValidEmail(username)) {
      try {
        await requestResetPasswordMutate(username);
        setIsSubmitted(true);
      } catch (error) {
        console.error("Помилка при відправці запиту:", error);
      }
    }
    else {
      setError("Please enter a valid email address.");
      setIsSubmitted(false);
    }
  };

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
            <InputField
              value={username}
              onChange={handleUsername}
              isSubmitted={isSubmitted}
              type="text"
              label="Email"
              validate={(value: string) => isValidPassword(value)}
              isMobile={isMobile}
            />
          </Box>
          <Button
            action={handleSendRequest}
            error={error}
            label="Send Request"
            setError={setError}
            isPending={false}
            variant="contained"
            isMobile={isMobile}
            props={{
              sx: {
                height: isMobile ? "4rem" : "6rem",
              },
            }}
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

export default RequestChangePassword;
