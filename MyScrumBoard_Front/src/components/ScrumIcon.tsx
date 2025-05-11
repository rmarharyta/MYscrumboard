import { useState } from "react";
import {
  Box,
  Typography,
  useMediaQuery,
  useTheme,
  Tooltip,
  DialogContent,
  DialogTitle,
  Dialog,
  TextField,
  DialogActions,
  Button,
  Alert,
  Snackbar,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import useAuth from "../utils/Contexts/useAuth";
import { useNavigate } from "react-router-dom";

interface Props {
  scrumId: string;
  projectId: string;
  ownerId: string;
  scrumName: string;
  date_time: Date;
  defaultSrc: string;
  hoverSrc: string;
  deletemutate: (string: string) => void;
  renamemutate: ({
    scrumId,
    scrumName,
  }: {
    scrumId: string;
    scrumName: string;
  }) => void;
}

export default function ScrumIcon({
  scrumId,
  //projectId,
  ownerId,
  scrumName,
  // date_time,
  defaultSrc,
  hoverSrc,
  deletemutate,
  renamemutate,
}: Props) {
  const { userId } = useAuth();
  const [imageSrc, setImageSrc] = useState(defaultSrc);

  const navigate = useNavigate();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [menuAnchor, setMenuAnchor] = useState<
    EventTarget & HTMLButtonElement
  >();
  const [openDialogDelete, setOpenDialogDelete] = useState(false);

  const [openDialog, setOpenDialog] = useState(false);
  const [newscrumName, setNewscrumName] = useState("");

  const [error, setError] = useState<string | null>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(undefined);
  };

  const handleDeleteClick = () => {
    setOpenDialogDelete(true);
    handleMenuClose();
  };

  const handleConfirmDelete = () => {
    setOpenDialogDelete(false); // Тут можна додати логіку видалення
    deletemutate(scrumId);
  };

  const handleCancelDelete = () => {
    setOpenDialogDelete(false);
  };

  const openRenameScrumDialog = () => setOpenDialog(true);
  const closeRenameScrumDialog = () => setOpenDialog(false);

  const handleRenameScrum = () => {
    setNewscrumName("");
    scrumName = newscrumName;
    renamemutate({
      scrumId,
      scrumName,
    });
    closeRenameScrumDialog();
  };

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
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          cursor: "pointer",
          transition: "0.3s",
          "&:hover": { transform: "scale(1.05)" },
          width: 180,
        }}
        onMouseEnter={() => setImageSrc(hoverSrc)}
        onMouseLeave={() => setImageSrc(defaultSrc)}
      >
        <Box
          sx={{
            width: 180,
            height: 180,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={() => navigate(`/scrumboard/${scrumId}/${ownerId}`)}
        >
          <img
            src={imageSrc}
            alt={scrumName}
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mt: 1,
            width: "100%",
            overflow: "hidden",
          }}
        >
          <Tooltip title={scrumName} arrow>
            <Typography
              variant="h6"
              sx={{
                mt: 1,
                fontWeight: "400",
                fontSize: isMobile ? "15px" : "18px",
                font: "Poppins, sans-serif",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                flexGrow: 1,
              }}
            >
              {scrumName}
            </Typography>
          </Tooltip>
          {userId === ownerId && (
            <IconButton size="small" onClick={handleMenuOpen} sx={{ ml: 1 }}>
              <MoreVertIcon />
            </IconButton>
          )}
        </Box>
        <Menu
          anchorEl={menuAnchor}
          open={Boolean(menuAnchor)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={openRenameScrumDialog}>Rename</MenuItem>

          <MenuItem onClick={handleDeleteClick} sx={{ color: "#8D0000" }}>
            Delete
          </MenuItem>
        </Menu>
      </Box>

      {/* Діалог для перейменування */}
      <Dialog open={openDialog} onClose={closeRenameScrumDialog}>
        <DialogTitle sx={{ color: "#08031B" }}>Rename project</DialogTitle>
        <DialogContent>
          <TextField
            sx={{
              //   backgroundColor: "#D9D9D9",
              marginTop: "22px",
              color: "#565454",
              width: isMobile ? "60vw" : "40vw",
              height: "56px",
              maxWidth: "592px",
              fontFamily: "Poppins, sans-serif", // Шрифт
              fontSize: isMobile ? "15px" : "15px", // Розмір
              fontWeight: 400,
              borderRadius: isMobile ? "15px" : "20px", // Закруглення країв
              "& .MuiOutlinedInput-root": {
                borderRadius: isMobile ? "15px" : "20px",
                color: "#565454",
                "& fieldset": {
                  borderWidth: "1px",
                  borderColor: "#08031B", // Товщина лінії
                },
                "&:hover fieldset": {
                  borderWidth: "2px",
                  borderColor: "#08031B", // Товстіша лінія при наведенні
                },
                "&.Mui-focused fieldset": {
                  borderWidth: "1px", // Товстіша лінія при фокусі
                  borderColor: "#08031B",
                },
              },
            }}
            fullWidth
            label="Project Name"
            variant="outlined"
            value={newscrumName}
            onChange={(e) => setNewscrumName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeRenameScrumDialog} sx={{ color: "#08031B" }}>
            Cancel
          </Button>
          <Button
            onClick={handleRenameScrum}
            sx={{ backgroundColor: "#08031B" }}
            variant="contained"
          >
            Rename
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog з підтвердженням видалення */}
      <Dialog open={openDialogDelete} onClose={handleCancelDelete}>
        <DialogTitle sx={{ color: "#08031B" }}>Delete scrum</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure that you want to delete "{scrumName}"?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete} sx={{ color: "#08031B" }}>
            Cancel
          </Button>
          <Button
            onClick={handleConfirmDelete}
            sx={{ backgroundColor: "#08031B" }}
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
