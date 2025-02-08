import { Typography } from "@mui/material";
import { Box } from "@mui/material";

function WelcomeText() {
  return (
    <Box
      sx={{
        width: 624,
        height: "auto",
        alignItems: "flex-end", // Вирівнювання по правому краю
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography
        sx={{
          color: "#08031B",
          fontFamily: "Poppins, sans-serif",
          fontWeight: 600,
            fontSize: "64px",
          textAlign: "right",
        }}
      >
        Start work with
      </Typography>
      <Typography
        sx={{
          width: 257,
          color: "#565454",
          fontFamily: "Ledger, sans-serif",
          fontWeight: 400,
            fontSize: "36px",
          textAlign: "right",
          marginTop: "-20px",
          lineHeight: 1.1,
        }}
      >
        MY.scrum board
      </Typography>
    </Box>
  );
}

export default WelcomeText;
