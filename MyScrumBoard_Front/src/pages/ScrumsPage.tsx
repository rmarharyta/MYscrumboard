import {
  Box,
  Grid2 as Grid,
  IconButton,
  Button,
  Tooltip,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  useMediaQuery,
  useTheme,
  Typography,
  CircularProgress,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SortIcon from "@mui/icons-material/Sort";
import { useState, MouseEvent, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import {
  addNewScrum,
  DeleteScrum,
  findAllProjectScrum,
  RenameScrum,
} from "../utils/api/ScrumService";
import ScrumIcon from "../components/ScrumIcon";
import { useParams } from "react-router-dom";
import AddButtonScrums from "../components/AddButtonScrums";

interface Scrum {
  scrumId: string;
  projectId: string;
  scrumName: string;
  date_time: Date;
}

const ScrumsPage: React.FC = () => {
  const { projectId } = useParams<{
    projectId: string;
  }>();

  const [Scrums, setScrums] = useState<Scrum[]>([]);

  const [ownerId, setOwnerId] = useState<string>("");

  const { isPending, isError, mutate } = useMutation({
    mutationFn: async () => {
      const response = await findAllProjectScrum(projectId ?? ""); // або ваш API запит
      setScrums(response.scrums); // зберігаємо отримані проекти
      setOwnerId(response.ownerId);
    },
    onError: (error: any) => {
      console.error("Помилка завантаження скрамів: ", error);
    },
    onSuccess: () => {
      console.log("Проекти завантажено успішно");
    },
  });

  //mutate for delete Scrum
  const {
    // isPending: deleteIsPending,
    // isError: deleteIsError,
    mutate: deletemutate,
  } = useMutation({
    mutationFn: async (scrumId: string) => {
    await DeleteScrum(scrumId); // або ваш API запит
    setScrums(Scrums.filter((p) => p.scrumId !== scrumId));

    },
    onError: (error: Error) => {
      console.error("Помилка ??? скрамів: ", error.message);
    },
    onSuccess: () => {
      console.log("Проекти ??? успішно");
    },
  });

  //mutate for add Scrum
  const {
    // isPending: addIsPending,
    // isError: addIsError,
    mutate: addmutate,
  } = useMutation({
    mutationFn: async ({
      projectId,
      scrumName,
    }: {
      projectId: string;
      scrumName: string;
    }) => {
      const newScrum = await addNewScrum(projectId, scrumName);
      setScrums(currentScrums => [...currentScrums, newScrum]);
    },
    onError: (error: Error) => {
      console.error("Помилка ??? проектів: ", error.message);
    },
    onSuccess: () => {
      closeAddScrumDialog();
      console.log("Проекти ??? успішно");
    },
  });

  //mutate for rename Scrum
  const {
    // isPending: addIsPending,
    // isError: addIsError,
    mutate: renamemutate,
  } = useMutation({
    mutationFn: async ({
      scrumId,
      scrumName,
    }: {
      scrumId: string;
      scrumName: string;
    }) => {
      await RenameScrum(scrumId, scrumName); // або ваш API запит
      setScrums(
        Scrums.map((p) => (p.scrumId === scrumId ? { ...p, scrumName } : p))
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

  useEffect(() => {
    mutate(); // Викликаєте fetchScrums, щоб завантажити проекти
  }, []);

  const [isSubmitted, setIsSubmitted] = useState(false);

  const [sortBy, setSortBy] = useState<"name" | "newest" | "oldest">("newest");
  const [sortAnchor, setSortAnchor] = useState<null | HTMLElement>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [newscrumName, setNewscrumName] = useState("");

  const [isTouched, setIsTouched] = useState(false);
  const handleBlur = () => {
    setIsTouched(true); // Позначаємо, що користувач завершив введення
  };

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const sortedScrums = [...Scrums].sort((a, b) => {
    if (sortBy === "name") {
      return a.scrumName.localeCompare(b.scrumName);
    } else if (sortBy === "newest") {
      return new Date(b.date_time).getTime() - new Date(a.date_time).getTime();
    } else {
      return new Date(a.date_time).getTime() - new Date(b.date_time).getTime();
    }
  });

  const handleSortChange = (newSortBy: "name" | "newest" | "oldest") => {
    setSortBy(newSortBy);
    setSortAnchor(null);
  };

  const openSortMenu = (event: MouseEvent<HTMLButtonElement>) => {
    setSortAnchor(event.currentTarget);
  };

  const closeSortMenu = () => {
    setSortAnchor(null);
  };

  const openAddScrumDialog = () => setOpenDialog(true);
  const closeAddScrumDialog = () => {
    setOpenDialog(false);
    setNewscrumName("");
  };

  return (
    <Box>
      {/* Верхня панель */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          width: "100%",
          mt: 4,
        }}
      >
        <Tooltip title="Add Scrum" color="#08031B" arrow>
          <IconButton onClick={openAddScrumDialog}>
            <AddIcon />
          </IconButton>
        </Tooltip>

        {/* Кнопка сортування */}
        <Tooltip title="Sort" color="#08031B" arrow>
          <IconButton onClick={openSortMenu}>
            <SortIcon />
          </IconButton>
        </Tooltip>

        {/* Меню сортування */}
        <Menu
          sx={{
            fontFamily: "Poppins, sans-serif", // Шрифт
            fontSize: "15px", // Розмір
            fontWeight: 400,
          }}
          anchorEl={sortAnchor}
          open={Boolean(sortAnchor)}
          onClose={closeSortMenu}
        >
          <MenuItem
            selected={sortBy === "name"}
            onClick={() => handleSortChange("name")}
          >
            By alphabet
          </MenuItem>
          <MenuItem
            selected={sortBy === "newest"}
            onClick={() => handleSortChange("newest")}
          >
            By newest data
          </MenuItem>
          <MenuItem
            selected={sortBy === "oldest"}
            onClick={() => handleSortChange("oldest")}
          >
            By oldest data
          </MenuItem>
        </Menu>
      </Box>
      {/* скрами */}
      <Box sx={{ display: "flex", justifyContent: "center" }}>
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
          <Grid
            container
            spacing={0.5}
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", // Рівномірно заповнює екран
              gap: "1rem",
              width: "100%",
            }}
          >
            {sortedScrums.map((Scrum) => (
              <Grid
                key={Scrum.scrumId}
                columns={{ xs: 6, sm: 4, md: 3, lg: 2 }}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <ScrumIcon
                  scrumId={Scrum.scrumId}
                  projectId={Scrum.projectId}
                  ownerId={ownerId}
                  scrumName={Scrum.scrumName}
                  date_time={Scrum.date_time}
                  deletemutate={deletemutate}
                  renamemutate={renamemutate}
                  defaultSrc="/src/assets/scrum_close.svg"
                  hoverSrc="/src/assets/scrum_open.svg"
                />
              </Grid>
            ))}
          </Grid>
        )}
      </Box>

      {/* Діалогове вікно додавання проекту */}
      <Dialog open={openDialog} onClose={closeAddScrumDialog}>
        <DialogTitle sx={{ color: "#08031B" }}>Add New Scrum</DialogTitle>
        <DialogContent>
          <TextField
            sx={{
              // backgroundColor: "#D9D9D9",
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
            onBlur={handleBlur}
            label="Scrum Name"
            variant="outlined"
            value={newscrumName}
            onChange={(e) => setNewscrumName(e.target.value)}
            error={!isTouched && isSubmitted}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={closeAddScrumDialog}
            variant="contained"
            sx={{
              backgroundColor: "#FFFFFF",
              color: "#08031B",
              fontFamily: "Poppins, sans-serif", // Шрифт
              fontSize: isMobile ? "15px" : "20px", // Розмір
              fontWeight: 400,
              borderRadius: "10px",
              textTransform: "none",
            }}
          >
            Cancel
          </Button>
          <AddButtonScrums
            name={newscrumName}
            projectId={projectId ?? ""}
            setIsSubmitted={setIsSubmitted}
            isDisabled={!isTouched}
            addmutate={addmutate}
          />
        </DialogActions>
      </Dialog>
    </Box>
  );
};
export default ScrumsPage;
