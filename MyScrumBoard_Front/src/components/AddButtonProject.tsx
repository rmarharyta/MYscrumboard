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

  setIsSubmitted: (value: boolean) => void;
  isDisabled: boolean;

  addmutate: (string: string) => void; //Add
}

function AddProjectButton({
  name,
  setIsSubmitted,
  isDisabled,
  addmutate,
}: Props) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [error, setError] = useState<string | null>(null);

  // const { mutate } = useMutation({
  //   mutationFn: async () => addNewProject(name),
  //   onError: () => {
  //     setError("Something went wrong");
  //   },
  //   onSuccess: () => {
  //     closeAddProjectDialog();
  //     setError(null);
  //   },
  // });
  return (
    <>
      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError(null)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }} // Сповіщення у верхньому правому куті
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
          if (name && !isDisabled) {
            addmutate(name);
            // closeAddProjectDialog();
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
