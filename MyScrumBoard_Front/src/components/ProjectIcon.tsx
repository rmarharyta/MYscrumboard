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
  List,
  ListItem,
  ListItemText,
  Alert,
  Snackbar,
  Stack,
  Autocomplete,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { findParticipants, findUser } from "../utils/api/ProjectService";
import { useMutation, useQuery } from "@tanstack/react-query";
import useAuth from "../utils/Contexts/useAuth";
import {
  addParticipant,
  deleteParticipant,
} from "../utils/api/CollaborationService";
import { useNavigate } from "react-router-dom";

interface Props {
  projectId: string;
  ownerId: string;
  projectName: string;
  date_time: Date;
  defaultSrc: string;
  hoverSrc: string;
  deletemutate: (string: string) => void;
  renamemutate: ({
    projectId,
    projectName,
  }: {
    projectId: string;
    projectName: string;
  }) => void;
}

interface Participants {
  userId: string;
  email: string;
}

export default function ProjectIcon({
  projectId,
  ownerId,
  projectName,
  // date_time,
  defaultSrc,
  hoverSrc,
  deletemutate,
  renamemutate,
}: Props) {
  const [imageSrc, setImageSrc] = useState(defaultSrc);

  const { userId } = useAuth();

  const navigate = useNavigate();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [menuAnchor, setMenuAnchor] = useState(null);
  const [openCollab, setOpenCollab] = useState(false);
  const [openDialogDelete, setOpenDialogDelete] = useState(false);

  const [openDialog, setOpenDialog] = useState(false);
  const [newProjectName, setNewProjectName] = useState("");

  const [participants, setParticipants] = useState<Participants[]>([]);

  const [error, setError] = useState<string | null>(null);

  const [onBehalf, setOnBehalf] = useState<Participants | []>([]);
  
  const { /*isPending,*/ /*isError,*/ mutate } = useMutation({
    mutationFn: async (projectId: string) => {
      return await findParticipants(projectId); // або ваш API запит
    },
    onError: (error: any) => {
      console.error("Помилка завантаження учасників: ", error);
    },
    onSuccess: (response) => {
      setParticipants(response);
      console.log("Учасники завантажено успішно");
      console.log(userId);
    },
  });

  const { isLoading, data } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await findUser();
      return response;
    },
    // onError: (error:any) => {
    //   console.error("Сталася помилка при запиті:", error);
    //   // Тут ви можете обробити помилки, наприклад, відобразити повідомлення про помилку
    // },
  });
  //delete user from project
  const {
    // isPending: deleteIsPending,
    // isError: deleteIsError,
    mutate: deleteParticinatMutate,
  } = useMutation({
    mutationFn: async ({
      projId,
      userId,
    }: {
      projId: string;
      userId: string;
    }) => {
      DeleteParticipant(projId, userId); // або ваш API запит
    },
    onError: (error: Error) => {
      console.error("Помилка ??? учасника: ", error.message);
    },
    onSuccess: () => {
      console.log("учасник ??? успішно");
    },
  });

  //mutate for add project
  const {
    // isPending: addIsPending,
    // isError: addIsError,
    mutate: addParticipantMutate,
  } = useMutation({
    mutationFn: async ({
      projId,
      userId,
    }: {
      projId: string;
      userId: string;
    }) => {
      AddParticipant(projId, userId); // або ваш API запит
    },
    onError: (error: Error) => {
      console.error("Помилка ??? учасника: ", error.message);
    },
    onSuccess: () => {
      mutate(projectId);
      console.log("Учасник ??? успішно");
    },
  });

  const DeleteParticipant = (projId: string, userId: string) => {
    deleteParticipant(projId, userId);
    setParticipants(participants.filter((p) => p.userId !== userId));
  };

  const AddParticipant = (projId: string, userId: string) => {
    addParticipant(projId, userId);
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
  };
  const handleOpenCollaboration = () => {
    setOpenCollab(true);
    mutate(projectId);
    handleMenuClose();
  };
  const handleDeleteClick = () => {
    setOpenDialogDelete(true);
    handleMenuClose();
  };

  const handleConfirmDelete = () => {
    setOpenDialogDelete(false); // Тут можна додати логіку видалення
    deletemutate(projectId);
  };

  const handleCancelDelete = () => {
    setOpenDialogDelete(false);
  };

  function handlerSetOnBehalf(value: Participants | []): void {
    setOnBehalf(value);
  }

  const openRenameProjectDialog = () => setOpenDialog(true);
  const closeRenameProjectDialog = () => setOpenDialog(false);

  const handleRenameProject = () => {
    setNewProjectName("");
    projectName = newProjectName;
    renamemutate({
      projectId,
      projectName,
    });
    closeRenameProjectDialog();
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
          onClick={() => navigate(`/scrum/${projectId}`)}
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
          {userId === ownerId && (
            <MenuItem onClick={openRenameProjectDialog}>Rename</MenuItem>
          )}
          <MenuItem onClick={handleOpenCollaboration}>
            Переглянути учасників
          </MenuItem>
          {userId === ownerId && (
            <MenuItem onClick={handleDeleteClick} sx={{ color: "#8D0000" }}>
              Delete
            </MenuItem>
          )}
        </Menu>
      </Box>
      {/* Діалогове вікно для CollaborationList */}
      <Dialog
        open={openCollab}
        onClose={() => setOpenCollab(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>"{projectName}" Participants</DialogTitle>
        <DialogContent>
          <List>
            {participants.map((participant) => (
              <ListItem
                key={participant.userId}
                secondaryAction={
                  userId === ownerId && (
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      sx={{ color: "#08031B" }}
                      onClick={() =>
                        deleteParticinatMutate({
                          projId: projectId,
                          userId: participant.userId,
                        })
                      }
                    >
                      <DeleteIcon sx={{ color: "#08031B" }} />
                    </IconButton>
                  )
                }
              >
                <ListItemText primary={participant.email} />
              </ListItem>
            ))}
          </List>
          {userId === ownerId && (
            <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
              <Stack spacing={1} sx={{ width: "100%" }}>
                <Autocomplete
                  disableClearable
                  autoHighlight
                  loading={isLoading}
                  options={data || []}
                  getOptionLabel={(option) => option?.email ?? ""}
                  dir={theme.direction}
                  onChange={(_, value) => {
                    handlerSetOnBehalf(value);
                  }}
                  value={onBehalf}
                  renderInput={(params) => (
                    <TextField
                      dir={theme.direction}
                      {...params}
                      label={"Email"}
                      slotProps={{
                        input: {
                          ...params.InputProps,
                        },
                      }}
                      sx={{
                        color: "#565454",
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
                    />
                  )}
                  renderOption={(props, option) => {
                    const { key, ...optionProps } = props;
                    return (
                      <Box
                        className={key}
                        key={option.userId}
                        component="li"
                        {...optionProps}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          flexDirection: "column",
                        }}
                      >
                        <Typography
                          variant="body1"
                          sx={{
                            color: "#565454",
                            fontFamily: "Poppins, sans-serif", // Шрифт
                            fontSize: isMobile ? "15px" : "15px", // Розмір
                            fontWeight: 400,
                          }}
                        >
                          {option.email}
                        </Typography>

                        {/* <Typography variant="caption" color="text.secondary">
                        {option.firstname + " " + option.lastname}
                      </Typography> */}
                      </Box>
                    );
                  }}
                  filterOptions={(options, state) => {
                    if (state.inputValue.length > 2) {
                      return options.filter((item) => {
                        return String(item.email)
                          .toLowerCase()
                          .includes(state.inputValue.toLowerCase());
                      });
                    }
                    return [];
                  }}
                />
              </Stack>
              <IconButton
                sx={{ color: "#08031B" }}
                onClick={() => {
                  if (onBehalf && "userId" in onBehalf) {
                    addParticipantMutate({
                      projId: projectId,
                      userId: onBehalf?.userId,
                    });
                  }
                }}
              >
                <AddIcon sx={{ color: "#08031B" }} />
              </IconButton>
            </Box>
          )}
        </DialogContent>
      </Dialog>

      {/* Діалог для перейменування */}
      <Dialog open={openDialog} onClose={closeRenameProjectDialog}>
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
            Are you sure that you want to delete "{projectName}"?
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
