import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  Drawer,
  IconButton,
  Avatar,
  Grid2,
  useTheme,
  CircularProgress,
  useMediaQuery,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import Note from "../components/Note";
import CreateNoteDialog from "../components/CreateNoteDialog";
import ConfirmDialog from "../components/ConfirnDialog";
import { useParams } from "react-router-dom";
import useAuth from "../utils/Contexts/useAuth";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  addNewNote,
  ChangeNote,
  ChangeNoteColor,
  ChangeNoteStatus,
  DeleteNote,
  findAllScrumNotes,
} from "../utils/api/NotesService";

// Define interfaces for our data structures
export interface NoteType {
  noteId?: string;
  scrumId: string;
  noteValue: string;
  position: number;
  colorId: number;
}

export type SectionType = 0 | 1 | 2 | 3 | 4;
export type ColorType = 0 | 1 | 2 | 3 | 4 | 5;

const ScrumBoardPage: React.FC = () => {
  const { userId } = useAuth();

  const theme = useTheme();

  const { scrumId, ownerId } = useParams<{
    scrumId: string;
    ownerId: string;
  }>();

  // Color map for Material UI
  const colorMap: Record<ColorType, string> = {
    0: "#f9d71c",
    1: "#f9851c",
    2: "#f97c9c",
    3: "#e74c3c",
    4: "#3498db",
    5: "#2ecc71",
  };
  const statusMap: Record<number, string> = {
    0: "STORI/PBI",
    1: "To do",
    2: "In process",
    3: "To verify/testing",
    4: "Done",
  };
  // State variables
  const [notes, setNotes] = useState<NoteType[]>([]);
  const [sections] = useState<SectionType[]>([0, 1, 2, 3, 4]);
  const [colors] = useState<ColorType[]>([0, 1, 2, 3, 4, 5]);
  const [selectedColor, setSelectedColor] = useState<ColorType | null>(null);
  const [deleteMode, setDeleteMode] = useState<boolean>(false);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState<boolean>(false);
  const [selectedNote, setSelectedNote] = useState<NoteType | null>(null);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] =
    useState<boolean>(false);
  const [confirmAction, setConfirmAction] = useState<string>("");
  const [confirmData, setConfirmData] = useState<any>(null);

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Load notes from database
  const { data, isPending, isError } = useQuery({
    queryKey: ["scrumNotes", scrumId],
    enabled: !!scrumId,
    queryFn: async () => {
      const response = await findAllScrumNotes(scrumId || ""); // або ваш API запит
      setNotes(response) // зберігаємо отримані проекти
      return response;
    }
  })
  //mutate for delete Scrum
  const { mutate: deletemutate } = useMutation({
    mutationFn: async (noteId: string) => {
      await DeleteNote(noteId); // або ваш API запит
      setNotes((currentNotes) =>
        currentNotes.filter((note) => note.noteId !== noteId)
      );
    },
    onError: (error: Error) => {
      console.error("Помилка ??? скрамів: ", error.message);
    },
    onSuccess: () => {
      console.log("Проекти ??? успішно");
      setDeleteMode(false);
      setIsConfirmDialogOpen(false);
    },
  });

  //mutate for add Scrum
  const { mutate: addmutate, isPending: isPendingAddScrum } = useMutation({
    mutationFn: async ({
      scrumId,
      noteValue,
      position,
      colorId,
    }: {
      scrumId: string;
      noteValue: string;
      position: number;
      colorId: number;
    }) => {
      const newNote = await addNewNote(scrumId, noteValue, position, colorId);
      setNotes((currentNotes) => [...currentNotes, newNote]);
    },
    onError: (error: Error) => {
      console.error("Помилка ??? проектів: ", error.message);
    },
    onSuccess: () => {
      setIsCreateDialogOpen(false);
      console.log("Проекти ??? успішно");
    },
  });

  //mutate for change Scrum
  const {
    isPending: isPendingChangeScrum,
    // isError: addIsError,
    mutate: changemutate,
  } = useMutation({
    mutationFn: async ({
      noteId,
      noteValue,
      position,
      colorId,
    }: {
      noteId: string;
      noteValue: string;
      position: number;
      colorId: number;

    }) => {
      await ChangeNote(noteId, noteValue, position, colorId); // або ваш API запит
      setNotes((currentNotes) =>
        currentNotes.map((note) =>
          note.noteId === noteId
            ? { ...note, noteValue, position, colorId }
            : note
        )
      );
    },
    onError: (error: Error) => {
      console.error("Помилка ??? проектів: ", error.message);
    },
    onSuccess: () => {
      //mutate();
      console.log("Проекти ??? успішно");
      setSelectedNote(null);
    },
  });

  //mutate for change status Scrum
  const {
    // isPending: addIsPending,
    // isError: addIsError,
    mutate: changestatusmutate,
  } = useMutation({
    mutationFn: async ({
      noteId,
      position,
    }: {
      noteId: string;
      position: number;
    }) => {
      await ChangeNoteStatus(noteId, position);
      // Негайне оновлення позиції нотатки в стані
      setNotes((currentNotes) =>
        currentNotes.map((note) =>
          note.noteId === noteId ? { ...note, position } : note
        )
      );
    },
    onError: (error: Error) => {
      console.error("Помилка ??? проектів: ", error.message);
    },
    onSuccess: () => {
      //mutate();
      console.log("Проекти ??? успішно");
    },
  });

  //mutate for change status Scrum
  const {
    // isPending: addIsPending,
    // isError: addIsError,
    mutate: changecolormutate,
  } = useMutation({
    mutationFn: async ({
      noteId,
      colorId,
    }: {
      noteId: string;
      colorId: number;
    }) => {
      await ChangeNoteColor(noteId, colorId);
      // Негайне оновлення кольору нотатки в стані
      setNotes((currentNotes) =>
        currentNotes.map((note) =>
          note.noteId === noteId ? { ...note, colorId } : note
        )
      );
    },
    onError: (error: Error) => {
      console.error("Помилка ??? проектів: ", error.message);
    },
    onSuccess: () => {
      //mutate();
      console.log("Проекти ??? успішно");
      setSelectedColor(null);
      setIsConfirmDialogOpen(false);
    },
  });

  useEffect(() => {
    // mutate(); // Викликаєте fetchScrums, щоб завантажити проекти
    setNotes(data || []); // Зберігаєте отримані проекти в стані
  }, [data]);

  // Handle note click based on current mode
  const handleNoteClick = (note: NoteType) => {
    if (selectedColor) {
      // Color change mode
      setConfirmAction("changeColor");
      setConfirmData({ id: note.noteId, color: selectedColor });
      setIsConfirmDialogOpen(true);
    } else if (deleteMode) {
      // Delete mode
      setConfirmAction("delete");
      setConfirmData({ id: note.noteId });
      setIsConfirmDialogOpen(true);
    } else {
      // Normal mode - open note details
      setSelectedNote(note);
    }
  };

  // Handle dragging and dropping notes between sections
  const handleDragStart = (e: React.DragEvent, noteId: string) => {
    e.dataTransfer.setData("noteId", noteId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, position: number) => {
    e.preventDefault();
    const noteId = e.dataTransfer.getData("noteId");
    changestatusmutate({ noteId, position });
  };

  // Handle confirm dialog actions
  const handleConfirm = () => {
    if (confirmAction === "delete" && confirmData) {
      deletemutate(confirmData.id);
      setIsConfirmDialogOpen(false);
    } else if (confirmAction === "changeColor" && confirmData) {
      changecolormutate({ noteId: confirmData.id, colorId: confirmData.color });
      setIsConfirmDialogOpen(false);
    }
  };

  const handleCreateNote = (newnote: NoteType) => {
    addmutate({
      scrumId: newnote.scrumId,
      noteValue: newnote.noteValue,
      position: newnote.position,
      colorId: newnote.colorId,
    });
  };
  const handleUpdateNote = (note: NoteType) => {
    changemutate({
      noteId: note.noteId!,
      noteValue: note.noteValue,
      position: note.position,
      colorId: note.colorId,
    });
    setSelectedNote(null);
  };

  return (
    <Box sx={{ display: "flex", height: "93dvh" }}>
      {/* Left sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: 70,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 70,
            position: "fixed", // Фіксуємо Drawer
            top: 64, // Встановлюємо відступ, щоб він починався під навбаром
            left: 0,
            bottom: 0,
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: 2,
          },
        }}
      >
        <IconButton
          color="primary"
          onClick={() => setIsCreateDialogOpen(true)}
          sx={{ mb: 2 }}
        >
          <AddIcon />
        </IconButton>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 1, mb: 2 }}>
          {colors.map((color) => (
            <Avatar
              key={color}
              sx={{
                bgcolor: colorMap[color],
                cursor: "pointer",
                border:
                  selectedColor === color
                    ? `2px solid ${theme.palette.text.primary}`
                    : "none",
                "&:hover": {
                  transform: "scale(1.1)",
                },
              }}
              onClick={() => {
                setSelectedColor(selectedColor === color ? null : color);
                setDeleteMode(false);
              }}
            />
          ))}
        </Box>

        <Box sx={{ flexGrow: 0.8 }} />
        {userId === ownerId && (
          <IconButton
            color={deleteMode ? "error" : "default"}
            onClick={() => {
              setDeleteMode(!deleteMode);
              setSelectedColor(null);
            }}
          >
            <DeleteIcon />
          </IconButton>
        )}
      </Drawer>
      {/* Main board with sections */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          display: "flex",
          overflowX: "auto",
          bgcolor: theme.palette.grey[100],
          height: "100%",
        }}
      >
        {isPending ? (
          <Box
            sx={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(255, 255, 255, 0.17)",
              zIndex: 9999,
            }}
          >
            <CircularProgress color="inherit" />
          </Box>
        ) : isError ? (
          <Typography
            sx={{
              justifyContent: "center",
              color: "#8D0000",
              fontFamily: "Poppins, sans-serif",
              fontWeight: 600,
              fontSize: isMobile ? "36px" : "64px",
              textAlign: "center",
              alignContent: "center",
              alignItems: "center",
            }}
          >
            Something went wrong...
          </Typography>
        ) : (
          <Grid2 container sx={{ width: '100%' }} spacing={2}>
            {sections.map((section) => (
              <Grid2
                size={{ xs: 12, sm: 2.4 }}
                key={section}>
                <Paper
                  elevation={2}
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    overflow: "hidden",
                  }}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, section)}
                >
                  <Box
                    sx={{
                      p: 2,
                      bgcolor: theme.palette.grey[200],
                      borderBottom: `1px solid ${theme.palette.divider}`,
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        color: "#08031B",
                        fontFamily: "Poppins, sans-serif",
                        fontWeight: 400,
                        fontSize: isMobile ? "14px" : "20px",
                      }}
                    >
                      {statusMap[section]}
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      p: 1,
                      overflowY: "auto",
                      flexGrow: 1,
                    }}
                  >
                    {notes
                      .filter((note) => note.position == section)
                      .map((note) => (
                        <Note
                          key={note.noteId}
                          note={note}
                          colorMap={colorMap}
                          onClick={() => handleNoteClick(note)}
                          onDragStart={(e) => handleDragStart(e, note.noteId!)}
                        />
                      ))}
                  </Box>
                </Paper>
              </Grid2>
            ))}
          </Grid2>
        )}
      </Box>

      {/* Dialogs */}
      {isCreateDialogOpen && (
        <CreateNoteDialog
          sections={sections}
          scrumId={scrumId}
          colors={colors}
          colorMap={colorMap}
          statusMap={statusMap}
          onClose={() => setIsCreateDialogOpen(false)}
          onSave={handleCreateNote}
          isPending={isPendingAddScrum}
        />
      )}

      {selectedNote && (
        <CreateNoteDialog
          note={selectedNote}
          sections={sections}
          colors={colors}
          colorMap={colorMap}
          statusMap={statusMap}
          onClose={() => setSelectedNote(null)}
          onSave={handleUpdateNote}
          isPending={isPendingChangeScrum}
        />
      )}

      {isConfirmDialogOpen && (
        <ConfirmDialog
          message={
            confirmAction === "delete"
              ? "Ви впевнені, що хочете видалити цю нотатку?"
              : "Ви впевнені, що хочете змінити колір цієї нотатки?"
          }
          onConfirm={handleConfirm}
          onCancel={() => {
            setIsConfirmDialogOpen(false);
            setDeleteMode(false);
            setSelectedColor(null);
          }}
        />
      )}
    </Box>
  );
};

export default ScrumBoardPage;
