import { Alert, Button, Snackbar, useMediaQuery, useTheme } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import useAuth from "../utils/Contexts/useAuth";
import { useState } from "react";

interface Props {
  email: string;
  password: string;
  setIsSubmitted: (value: boolean) => void;
  isDisabled: boolean;
}

function SignUpButton({ email, password, setIsSubmitted, isDisabled }: Props) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const auth = useAuth();
  const navigate = useNavigate();

  const [error, setError] = useState<string | null>(null);

  const { mutate, isPending } = useMutation({
    mutationFn: async () => auth.signup(email, password),
    onSuccess: () => {
      navigate("/dashboard"); // Перехід на головну сторінку
    },
    onError: () => {
      setError("Something went wrong, try again later."); // Встановлення повідомлення про помилку
    },
  });


  return (
    <>
      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError(null)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }} // Сповіщення у верхньому правому куті
      >
        <Alert
          onClose={() => setError(null)}
          severity="error"
          sx={{ width: "100%" }}
        >
          {error}
        </Alert>
      </Snackbar>
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
          marginTop: "22px",
        }}
        onClick={() => {
          setIsSubmitted(true);
          if (email && password && !isDisabled) mutate();
        }}
      >
        {isPending ? "Waiting..." : "Sign up"}
      </Button>
    </>
  );
}

export default SignUpButton;
