import React from "react";
import { useState } from "react";
import {
  Box,
  Typography,
  useMediaQuery,
  useTheme,
  Tooltip,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";

interface Props {
  id: string;
  projectName: string;
  defaultSrc: string;
  hoverSrc: string;
}

export default function ProjectIcon({
  id,
  projectName,
  defaultSrc,
  hoverSrc,
}: Props) {
  const [imageSrc, setImageSrc] = useState(defaultSrc);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [menuAnchor, setMenuAnchor] = useState(null);

  const handleMenuOpen = (event) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
  };

  return (
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
        <MenuItem onClick={handleMenuClose}>Редагувати</MenuItem>
        <MenuItem onClick={handleMenuClose}>Переглянути учасників</MenuItem>
        <MenuItem onClick={handleMenuClose}>Видалити</MenuItem>
      </Menu>
    </Box>
  );
}
