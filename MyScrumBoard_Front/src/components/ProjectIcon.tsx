import { useState, MouseEvent } from "react";
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
  List,
  ListItem,
  ListItemText,
  Alert,
  Snackbar,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { useMutation } from "@tanstack/react-query";
import useProject from "../utils/Contexts/useProject";

interface Props {
  projectId: string;
  ownerId: string;
  projectName: string;
  date_time: Date;
  defaultSrc: string;
  hoverSrc: string;
}

export default function ProjectIcon({
  projectId,
  // ownerId,
  projectName,
  // date_time,
  defaultSrc,
  hoverSrc,
}: Props) {
  const [imageSrc, setImageSrc] = useState(defaultSrc);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [openCollab, setOpenCollab] = useState(false);
  const [openDialogDelete, setOpenDialogDelete] = useState(false);

  const [participants, setParticipants] = useState<string[]>([
    "User 1",
    "User 2",
  ]);
  const [newParticipant, setNewParticipant] = useState("");

  const [openDialog, setOpenDialog] = useState(false);
  const [newProjectName, setNewProjectName] = useState("");

  const handleMenuOpen = (event: MouseEvent<HTMLButtonElement>) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
  };
  const handleOpenCollaboration = () => {
    setOpenCollab(true);
    handleMenuClose();
  };
  const handleDeleteClick = () => {
    setOpenDialogDelete(true);
    handleMenuClose();
  };

  const handleConfirmDelete = () => {
    setOpenDialogDelete(false); // Тут можна додати логіку видалення
    mutate();
  };

  const handleCancelDelete = () => {
    setOpenDialogDelete(false);
  };

  const handleAddParticipant = () => {
    if (newParticipant.trim()) {
      setParticipants([...participants, newParticipant.trim()]);
      setNewParticipant("");
    }
  };

  const handleRemoveParticipant = (name: string) => {
    setParticipants(participants.filter((p) => p !== name));
  };

  const openRenameProjectDialog = () => setOpenDialog(true);
  const closeRenameProjectDialog = () => setOpenDialog(false);

  const handleRenameProject = () => {
    setNewProjectName("");
    projectName = newProjectName;
    closeRenameProjectDialog();
  };
  const project = useProject();
  const [error, setError] = useState<string | null>(null);

  const { mutate } = useMutation({
    mutationFn: async () => project.deleteProject(projectId),
    onError: () => {
      setError("Something went wrong");
    },
    onSuccess: () => {
      console.log("Проєкт видалено");
      setError(null);
    },
  });

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
        >
          <img
            src={imageSrc}
            alt={projectName}
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
          <Tooltip title={projectName} arrow>
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
              {projectName}
            </Typography>
          </Tooltip>
          <IconButton size="small" onClick={handleMenuOpen} sx={{ ml: 1 }}>
            <MoreVertIcon />
          </IconButton>
        </Box>
        <Menu
          anchorEl={menuAnchor}
          open={Boolean(menuAnchor)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={openRenameProjectDialog}>Rename</MenuItem>
          <MenuItem onClick={handleOpenCollaboration}>
            Переглянути учасників
          </MenuItem>
          <MenuItem onClick={handleDeleteClick}>Видалити</MenuItem>
        </Menu>
      </Box>
      {/* Діалогове вікно для CollaborationList */}
      <Dialog
        open={openCollab}
        onClose={() => setOpenCollab(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>{projectName} participants</DialogTitle>
        <DialogContent>
          <List>
            {participants.map((participant) => (
              <ListItem
                key={participant}
                secondaryAction={
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => handleRemoveParticipant(participant)}
                  >
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <ListItemText primary={participant} />
              </ListItem>
            ))}
          </List>
          <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
            <TextField
              label="Add participant"
              value={newParticipant}
              onChange={(e) => setNewParticipant(e.target.value)}
              fullWidth
            />
            <IconButton onClick={handleAddParticipant} color="primary">
              <AddIcon />
            </IconButton>
          </Box>
        </DialogContent>
      </Dialog>

      {/* Діалог для перейменування */}
      <Dialog open={openDialog} onClose={closeRenameProjectDialog}>
        <DialogTitle sx={{ color: "#08031B" }}>Rename project</DialogTitle>
        <DialogContent>
          <TextField
            sx={{
              backgroundColor: "#D9D9D9",
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
            value={newProjectName}
            onChange={(e) => setNewProjectName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeRenameProjectDialog} sx={{ color: "#08031B" }}>
            Cancel
          </Button>
          <Button
            onClick={handleRenameProject}
            sx={{ backgroundColor: "#08031B" }}
            variant="contained"
          >
            Rename
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog з підтвердженням видалення */}
      <Dialog open={openDialogDelete} onClose={handleCancelDelete}>
        <DialogTitle sx={{ color: "#08031B" }}>Delete project</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure that you want to delete {projectName}?
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
