import {Button, useMediaQuery, useTheme} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { login } from "../utils/api/loginService";
import { useNavigate } from "react-router-dom";

interface Props {
  email: string;
  password: string;
  setIsSubmitted: (value: boolean) => void;
}

function LogInButton({ email, password, setIsSubmitted }: Props) {
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: () => login(email, password),
    onSuccess: (data) => {
      alert("Успішний вхід!");
      localStorage.setItem("token", data.token);
      navigate("/dashboard"); // Перехід на головну сторінку
    },
    onError: (error) => {
      alert("Помилка входу: " + error.message);
    },
  });
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Button
      variant="contained"
      sx={{
        backgroundColor: "#08031B",
        color: "#FFFFFF",
        width: isMobile ? "8rem" : "13rem",
        height: isMobile ? "3rem" : "4rem",
        fontFamily: "Poppins, sans-serif", // Шрифт
        fontSize: isMobile ? "20px" : "36px", // Розмір
        fontWeight: 400,
        borderRadius: "10px",
        textTransform: "none",
      }}
      onClick={() => {
        setIsSubmitted(true);
        if (email && password) mutate();
      }}
    >
      {isPending ? "Waiting..." : "Log in"}
    </Button>
  );
}

export default LogInButton;
