import Button from "@mui/material/Button";
import { useMutation } from "@tanstack/react-query";
import { login } from "../utils/api/loginService";

interface Props {
  email: string;
  password: string;
  setIsSubmitted: (value: boolean) => void;
}

function LogInButton({ email, password, setIsSubmitted }: Props) {
  const mutation = useMutation({
    mutationFn: () => login(email, password),
    onSuccess: (data) => {
      alert("Успішний вхід!");
      localStorage.setItem("token", data.token);
      window.location.href = "/dashboard"; // Перехід на головну сторінку
    },
    onError: (error) => {
      alert("Помилка входу: " + error.message);
    },
  });
  return (
    <Button
      variant="contained"
      sx={{
        backgroundColor: "#08031B",
        color: "#FFFFFF",
        width: "14rem",
        fontFamily: "Poppins, sans-serif", // Шрифт
        fontSize: "36px", // Розмір
        fontWeight: 400,
        borderRadius: "10px",
        textTransform: "none",
      }}
      onClick={() => {
        setIsSubmitted(true);
        if (email && password) mutation.mutate();
      }}
    >
      {mutation.isPending ? "Waiting..." : "Log in"}
    </Button>
  );
}

export default LogInButton;
