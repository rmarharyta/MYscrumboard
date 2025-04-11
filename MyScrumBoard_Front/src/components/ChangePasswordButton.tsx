import { Button, useMediaQuery, useTheme } from "@mui/material";

interface Props {
  onClick?: (event: any) => void;
  type?: "button" | "submit" | "reset" | undefined;
}

function ChangePasswordButton({ onClick, type }: Props) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Button
      variant="contained"
      type={type}
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
      onClick={onClick}
    >
      Change password
    </Button>
  );
}

export default ChangePasswordButton;
