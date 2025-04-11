import { useState } from "react";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import WelcomeText from "../components/WelcomeText";
import ChangePasswordButton from "../components/ChangePasswordButton";
import { resetPassword } from "../utils/api/PasswordService";
import { useNavigate, useParams } from "react-router-dom";
import PasswordInput from "../components/PasswordInput";
import { useMutation } from "@tanstack/react-query";

function ChangePassword() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();

  const { resettoken } = useParams();

  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { mutateAsync: changePasswordRequest, } = useMutation({
    mutationFn: async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setIsSubmitted(true);
      await resetPassword(password, resettoken);
    },
    onSuccess: () => {
      navigate("/");
    },
    onError: () => {
      setIsSubmitted(false);
    }
  });


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
            component="form"
            onSubmit={changePasswordRequest}
            autoComplete="off"
          >

            <PasswordInput
              id="password"
              label="Password"
              value={password}
              onChange={setPassword}
              isSubmitted={isSubmitted}
            />
            <PasswordInput
              id="confirm-password"
              label="Confirm Password"
              value={confirmPassword}
              onChange={setConfirmPassword}
              isSubmitted={isSubmitted}
              validateMatch={true}
              otherPasswordValue={password}
            />
            <ChangePasswordButton type="submit" />

          </Box>
        </Box>
      </Box>
    </Box >
  );
}

export default ChangePassword;
