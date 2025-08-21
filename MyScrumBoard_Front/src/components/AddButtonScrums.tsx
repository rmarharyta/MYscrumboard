import {
  Alert,
  Button,
  Snackbar,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useState } from "react";

interface Props {
  name: string;
  projectId: string;
  setIsSubmitted: (value: boolean) => void;
  isDisabled: boolean;

  addMutate: ({
    projectId,
    scrumName,
  }: {
    projectId: string;
    scrumName: string;
  }) => void;
}

function AddProjectButton({
  name,
  projectId,
  setIsSubmitted,
  isDisabled,
  addMutate,
}: Props) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [error, setError] = useState<string | null>(null);

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
      <Button
        onClick={() => {
          setIsSubmitted(true);
          if (name && projectId && !isDisabled) {
            addMutate({ projectId, scrumName: name });
          }
        }}
        variant="contained"
        sx={{
          backgroundColor: "#08031B",
          color: "#FFFFFF",
          fontFamily: "Poppins, sans-serif", // Шрифт
          fontSize: isMobile ? "15px" : "20px", // Розмір
          fontWeight: 400,
          borderRadius: "10px",
          textTransform: "none",
        }}
      >
        Add
      </Button>
    </>
  );
}

export default AddProjectButton;
