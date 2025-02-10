import { Button, useMediaQuery, useTheme } from "@mui/material";

interface Props {
  password: string;
  setIsSubmitted: (value: boolean) => void;
}

function ChangePasswordButton({ password, setIsSubmitted }: Props) {
  
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
        lineHeight: 1,
        fontWeight: 400,
        borderRadius: "10px",
        textTransform: "none",
        marginTop: "22px",
      }}
      onClick={() => {
        setIsSubmitted(true);
      }}
    >
      Change password
    </Button>
  );
}

export default ChangePasswordButton;
