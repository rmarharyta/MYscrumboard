import { useState } from "react";
import { Box } from "@mui/material";
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
          width: 880,
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
          {/* box sign up components */}
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
            {" "}
            <PasswordRegister
              valueFirst={password}
              valueSecond={repeatPassword}
              onChangeFirst={handlePassword}
              onChangeSecond={handleRepeatedPassword}
              isSubmitted={isSubmitted}
            />
            <ChangePasswordButton
              password={password}
              setIsSubmitted={setIsSubmitted}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default ChangePassword;
