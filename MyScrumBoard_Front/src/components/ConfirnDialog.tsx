import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";

interface ConfirmDialogProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  message,
  onConfirm,
  onCancel,
}) => {
  return (
    <Dialog open={true} onClose={onCancel} maxWidth="xs" fullWidth>
      <DialogTitle>Підтвердження</DialogTitle>

      <DialogContent>
        <Typography>{message}</Typography>
      </DialogContent>

      <DialogActions>
        <Button onClick={onCancel} color="inherit">
          Ні
        </Button>
        <Button onClick={onConfirm} color="primary" variant="contained">
          Так
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
