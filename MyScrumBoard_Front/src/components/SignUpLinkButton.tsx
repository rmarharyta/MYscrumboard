import { Button, useMediaQuery, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";

function SignUpLinkButton() {
  const navigate = useNavigate();
  const handleNavigateToRegister = () => {
    navigate("/signup");
  };
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Button
      variant="contained"
      sx={{
        backgroundColor: "#565454",
        color: "#FFFFFF",
        width: isMobile ? "8rem" : "13rem",
        height: isMobile ? "3rem" : "4rem",
        fontFamily: "Poppins, sans-serif", // Шрифт
       fontSize: isMobile ? "20px" : "36px", // Розмір
        fontWeight: 400,
        borderRadius: "10px",
        textTransform: "none",
      }}
      onClick={handleNavigateToRegister}
    >
      Sign up
    </Button>
  );
}

export default SignUpLinkButton;
