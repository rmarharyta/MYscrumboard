import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Box,
  Avatar,
  Grid,
} from "@mui/material";
import { NoteType, ColorType, SectionType } from "../pages/ScrumBoardPage";

interface CreateNoteDialogProps {
  note?: NoteType;
  scrumId?: string;
  sections: SectionType[];
  colors: ColorType[];
  colorMap: Record<number, string>;
  statusMap: Record<number, string>;
  onClose: () => void;
  onSave: (note: NoteType) => void;
}

const CreateNoteDialog: React.FC<CreateNoteDialogProps> = ({
  note,
  scrumId,
  sections,
  colors,
  colorMap,
  statusMap,
  onClose,
  onSave,
}) => {
  const [description, setDescription] = useState<string>("");
  const [color, setColor] = useState<ColorType>(1);
  const [section, setSection] = useState<SectionType>(1);

  // If note is provided, we're in edit mode
  useEffect(() => {
    if (note) {
      setDescription(note.noteValue);
      setColor(note.colorId as ColorType);
      setSection(note.position as SectionType);
    }
  }, [note]);

  const handleSave = () => {
    if (description.trim()) {
      if (note) {
        // Update existing note
        onSave({
          ...note,
          noteValue: description,
          position: section,
          colorId: color,
        });
      } else {
        // Create new note
        onSave({
          scrumId: scrumId as string,
          noteValue: description,
          position: section,
          colorId: color,
        });
      }
    }
  };

  return (
    <Dialog open={true} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {note ? "Редагувати нотатку" : "Створити нову нотатку"}
      </DialogTitle>

      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
          <TextField
            label="Опис"
            multiline
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            variant="outlined"
          />

          <Box>
            <InputLabel sx={{ mb: 1 }}>Колір</InputLabel>
            <Grid container spacing={1}>
              {colors.map((c) => (
                <Grid item key={c}>
                  <Avatar
                    sx={{
                      bgcolor: colorMap[c],
                      cursor: "pointer",
                      border: color === c ? "2px solid black" : "none",
                    }}
                    onClick={() => setColor(c)}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>

          <FormControl fullWidth>
            <InputLabel>Секція</InputLabel>
            <Select
              value={section}
              label="Секція"
              onChange={(e) => setSection(e.target.value as SectionType)}
            >
              {sections.map((s) => (
                <MenuItem key={s} value={s}>
                  {statusMap[s]}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} color="inherit">
          Скасувати
        </Button>
        <Button onClick={handleSave} color="primary" variant="contained">
          {note ? "Зберегти" : "Додати"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateNoteDialog;
