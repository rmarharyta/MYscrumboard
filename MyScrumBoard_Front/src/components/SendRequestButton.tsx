import { Button, useMediaQuery, useTheme } from "@mui/material";

interface Props {
  email: string;
  setIsSubmitted: (value: boolean) => void;
}

function SendRequestButton({ email, setIsSubmitted }: Props) {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Button
      variant="contained"
      sx={{
        backgroundColor: "#08031B",
        color: "#FFFFFF",
        width: isMobile ? "8rem" : "13rem",
        height: isMobile ? "4rem" : "6rem",
        fontFamily: "Poppins, sans-serif", // Шрифт
        fontSize: isMobile ? "20px" : "36px", // Розмір
        fontWeight: 400,
        borderRadius: "10px",
        textTransform: "none",
        marginTop: "22px",
        lineHeight: 1
      }}
      onClick={() => setIsSubmitted(true)}
    >
      Send request
    </Button>
  );
}

export default SendRequestButton;
