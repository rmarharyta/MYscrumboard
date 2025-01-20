import { Typography } from "@mui/material";
import { Box } from "@mui/material";

function WelcomeText() {
  return (
    <Box
      sx={{
        width: 478,
        height: "auto",
      }}
    >
      <Typography
        //variant="h2"
        sx={{
          //width: 478,
          //height: 122,
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
        //variant="h3"
        sx={{
                  width: 257,
          color: "#565454",
          fontFamily: "Ledger, sans-serif",
          fontWeight: 400,
          fontSize: "36px",
          textAlign: "right",
        }}
      >
        MY.scrum board
      </Typography>
    </Box>
  );
}

export default WelcomeText;
