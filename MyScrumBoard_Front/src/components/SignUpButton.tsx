import Button from "@mui/material/Button";

interface Props {
  email: string;
  password: string;
  setIsSubmitted: (value: boolean) => void;
}

function SignUpButton({ email, password, setIsSubmitted }: Props) {
  return (
    <Button
      variant="contained"
      sx={{
        backgroundColor: "#08031B",
        color: "#FFFFFF",
        width: 205,
        height: 72,
        fontFamily: "Poppins, sans-serif", // Шрифт
        fontSize: "36px", // Розмір
        fontWeight: 400,
        borderRadius: "10px",
        marginTop: "11px",
        textTransform: "none",
      }}
      onClick={() => {
        setIsSubmitted(true);
      }}
    >
      Sign up
    </Button>
  );
}

export default SignUpButton;
