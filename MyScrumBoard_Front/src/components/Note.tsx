import React from "react";
import { Paper, Typography, Box } from "@mui/material";
import { NoteType } from "../pages/ScrumBoardPage";

interface NoteProps {
  note: NoteType;
  colorMap: Record<string, string>;
  onClick: () => void;
  onDragStart: (e: React.DragEvent) => void;
}

const Note: React.FC<NoteProps> = ({
  note,
  colorMap,
  onClick,
  onDragStart,
}) => {
  return (
    <Paper
      elevation={1}
      sx={{
        p: 2,
        mb: 1.5,
        cursor: "pointer",
        borderLeft: `5px solid ${colorMap[note.colorId]}`,
        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow: 3,
        },
        transition: "transform 0.2s, box-shadow 0.2s",
      }}
      onClick={onClick}
      draggable
      onDragStart={onDragStart}
    >
      <Box>
        <Typography variant="body2">
          {note.noteValue.length > 100
            ? `${note.noteValue.substring(0, 100)}...`
            : note.noteValue}
        </Typography>
      </Box>
    </Paper>
  );
};

export default Note;