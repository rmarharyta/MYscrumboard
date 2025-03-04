import { useState } from "react";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import WelcomeText from "../components/WelcomeText";
import PasswordRegister from "../components/PasswordRegister";
import ChangePasswordButton from "../components/ChangePasswordButton";

function ChangePassword() {
  const [password, setPassword] = useState<string>("");
  const handlePassword = (newValue: string) => setPassword(newValue);

  const [repeatPassword, setRepeadPassword] = useState<string>("");
  const handleRepeatedPassword = (newValue: string) =>
    setRepeadPassword(newValue);

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
            {" "}
            <PasswordRegister
              valueFirst={password}
              valueSecond={repeatPassword}
              onChangeFirst={handlePassword}
              onChangeSecond={handleRepeatedPassword}
              isSubmitted={isSubmitted}
            />
          </Box>
          <ChangePasswordButton
            password={password}
            setIsSubmitted={setIsSubmitted}
          />
        </Box>
      </Box>
    </Box>
  );
}

export default ChangePassword;
