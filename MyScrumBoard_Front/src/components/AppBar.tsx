import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogActions, DialogContent, DialogTitle, ListItemIcon } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import useAuth from "../utils/Contexts/useAuth";
import { useMutation } from "@tanstack/react-query";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: "20px",
  backgroundColor: "#D9D9D9CC",
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#08031B",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "#08031B",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const drawerWidth = 240;
const navItems = ["View all"];

export default function DrawerAppBar() {
  const navigate = useNavigate();

  const auth = useAuth();
  const { mutate: mutateExit, /*isPending: isPendingExit*/ } = useMutation({
    mutationFn: async () => auth.logout(),
    onSuccess: () => {
      navigate("/");
    },
    onError: (error) => {
      console.log("Сталася помилка ", error);
    },
  });
  const { mutate: mutateDeleteAccount, /*isPending: isPendingDelete*/ } =
    useMutation({
      mutationFn: async () => auth.deleteaccount(),
      onSuccess: () => {
        navigate("/");
      },
      onError: (error) => {
        console.log("Сталася помилка ", error);
      },
    });
  const [mobileOpen, setMobileOpen] = React.useState(false);

  // Функція відкриття/закриття Drawer
  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  // Вміст Drawer
  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "left" }}>
      <Typography
        variant="h6"
        sx={{
          my: 2,
          fontFamily: "Ledger, sans-serif",
          fontWeight: 400,
          textAlign: "left",
          lineHeight: 1.1,
          width: "10rem",
          marginLeft: "1rem",
        }}
      >
        MY.scrum board
      </Typography>
      <Divider />
      <List sx={{ textAlign: "left" }}>
        {["Exit", "Delete account"].map((text) => (
          <ListItem key={text} disablePadding>
            <ListItemButton
              onClick={() => {
                if (text === "Exit") mutateExit();
                if (text === "Delete account") {setOpenDialogDelete(true) }
              }}
            >
              {/* Іконка для Exit */}
              {text === "Exit" && (
                <ListItemIcon>
                  <ExitToAppIcon sx={{ color: "#8D0000" }} />
                </ListItemIcon>
              )}
              {/* Іконка для Delete account */}
              {text === "Delete account" && (
                <ListItemIcon>
                  <DeleteIcon sx={{ color: "#8D0000" }} />
                </ListItemIcon>
              )}
              <ListItemText primary={text} sx={{ color: "#8D0000" }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
  const [openDialogDelete, setOpenDialogDelete] = React.useState(false);
    const handleCancelDelete = () => {
    setOpenDialogDelete(false);
  };
  const handleConfirmDelete = () => {
    setOpenDialogDelete(false); // Тут можна додати логіку видалення
    mutateDeleteAccount();
  };
  
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      {/* Верхня панель */}
      <AppBar
        sx={{
          backgroundColor: "#E6DFFF",
        }}
      >
        <Toolbar>
          {/* Кнопка для відкриття Drawer */}
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, color: "#08031B" }}
          >
            <MenuIcon />
          </IconButton>
          {/* Заголовок */}
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "left",
              justifyContent: "left",
              fontFamily: "Ledger, sans-serif",
              fontWeight: 400,
              fontSize: "16px",
              lineHeight: 1.1,
              color: "#08031B",
            }}
          >
            <span>MY.scrum</span>
            <span>board</span>
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
          {/* Кнопки навігації (не в Drawer) */}
          <Box>
            {navItems.map((item) => (
              <Button
                key={item}
                sx={{
                  color: "#08031B",
                  fontSize: "12px",
                  fontFamily: "Ledger, sans-serif",
                  fontWeight: 400,
                }}
                onClick={() => navigate("/dashboard")}
              >
                {item}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Drawer (відкривається при натисканні) */}
      <Drawer
        anchor="left"
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          "& .MuiDrawer-paper": { width: drawerWidth },
        }}
      >
        {drawer}
      </Drawer>
      {/* delete account */}
      <Dialog open={openDialogDelete} onClose={handleCancelDelete}>
        <DialogTitle sx={{ color: "#08031B" }}>Delete account</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure that you want to delete our account?
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
    </Box>
  );
}
