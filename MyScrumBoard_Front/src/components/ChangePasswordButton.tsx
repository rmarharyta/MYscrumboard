import Button from "@mui/material/Button";

function ChangePasswordButton() {
  return (
    <Button
      variant="contained"
      sx={{
        backgroundColor: "#08031B",
        color: "#FFFFFF",
        width: 380,
        height: 72,
        fontFamily: "Poppins, sans-serif", // Шрифт
        fontSize: "36px", // Розмір
        fontWeight: 400,
        borderRadius: "10px",
        marginTop: "11px",
        textTransform: "none",
      }}
    >
    Change password
    </Button>
  );
}

export default ChangePasswordButton;
