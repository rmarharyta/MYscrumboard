import Button from "@mui/material/Button";

function SignUpButton() {
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
    >
      Sign up
    </Button>
  );
}

export default SignUpButton;
