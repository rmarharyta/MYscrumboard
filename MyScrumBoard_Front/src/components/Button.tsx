import { Alert, Button as MuiButton, Snackbar } from "@mui/material";

interface Props {
  action: () => void;
  isPending?: boolean;
  error?: string | null;
  setError: (error: string | null) => void;
  label: string;
  variant: "text" | "contained" | "outlined";
  isMobile?: boolean;
  props?: React.ComponentProps<typeof MuiButton>;
}

function Button({ action, error, setError, isPending, label, variant, isMobile = false, props }: Props) {
  return (
    <>
      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError(null)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setError(null)}
          severity="error"
          sx={{ width: "100%" }}
        >
          {error}
        </Alert>
      </Snackbar>
      <MuiButton
        variant={variant}
        sx={{
          backgroundColor: "#08031B",
          color: "#FFFFFF",
          width: isMobile ? "8rem" : "13rem",
          height: isMobile ? "3rem" : "4rem",
          fontFamily: "Poppins, sans-serif",
          fontSize: isMobile ? "20px" : "36px",
          fontWeight: 400,
          borderRadius: "10px",
          textTransform: "none",
          lineHeight: 1,
          ...props?.sx, // Allow additional styles to be passed
        }}

        onClick={action}
      >
        {isPending ? "Waiting..." : label}
      </MuiButton>
    </>
  );
}

export default Button;
