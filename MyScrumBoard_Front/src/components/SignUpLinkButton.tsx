import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

function SignUpLinkButton() {
  const navigate = useNavigate();
    const handleNavigateToRegister = () => {
      navigate("/signup"); 
    };
  return (
    <Button
      variant="contained"
      sx={{
        backgroundColor: "#565454",
        color: "#FFFFFF",
        width: 205,
        height: 72,
        fontFamily: "Poppins, sans-serif", // Шрифт
        fontSize: "36px", // Розмір
        fontWeight: 400,
        borderRadius: "10px",
        marginTop: "-11px",
        textTransform: "none",
      }}
      onClick={handleNavigateToRegister}
    >
      Sign up
    </Button>
  );
}

export default SignUpLinkButton;

