import Button from "@mui/material/Button";

interface Props {
  email: string;
  setIsSubmitted: (value: boolean) => void;
}

function SendRequestButton({email, setIsSubmitted}:Props) {
    return (
        <Button
            variant="contained"
            sx={{
                backgroundColor: "#08031B",
                color: "#FFFFFF",
                width: 375,
                height: 72,
                fontFamily: "Poppins, sans-serif", // Шрифт
                fontSize: "36px", // Розмір
                fontWeight: 400,
                borderRadius: "10px",
                marginTop: "11px",
                textTransform: "none",
            }}
            onClick={() =>
                setIsSubmitted(true)
          }
    >
      Send request
    </Button>
  );
}

export default SendRequestButton;