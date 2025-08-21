import { useState } from "react";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import WelcomeText from "../components/WelcomeText";
import PasswordRegister from "../components/PasswordRegister";
import ChangePasswordButton from "../components/ChangePasswordButton";
<<<<<<< Updated upstream
=======
import { resetPassword } from "../utils/api/PasswordService";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import InputField from "../components/InputField";
import { isValidPassword } from "../utils/commonFunctions";
>>>>>>> Stashed changes

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
<<<<<<< Updated upstream
            {" "}
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
              onChange={(value) => setConfirmPassword(value)}
              isSubmitted={isSubmitted}
              type="password"
              label="Confirm Password"
              validate={() => confirmPassword === password}
              isMobile={isMobile}
            />
            <ChangePasswordButton type="submit" />
>>>>>>> Stashed changes
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
