import {
  Box,
  Grid2 as Grid,
  IconButton,
  Button,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  FormControlLabel,
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
} from "@mui/material";
import ProjectIcon from "../components/ProjectIcon";
import AddIcon from "@mui/icons-material/Add";
import SortIcon from "@mui/icons-material/Sort";
import FilterListIcon from "@mui/icons-material/FilterList";
import { useState, MouseEvent, useEffect } from "react";
import AddProjectButton from "../components/AddProjectButton";
import useProject from "../utils/Contexts/useProject";
import { useMutation } from "@tanstack/react-query";


interface Project {
  projectId: string;
  ownerId: string;
  projectName: string;
  date_time: Date;
}
const Dashboard: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  const proj = useProject();

  const { isPending, isError, mutate} = useMutation({
    mutationFn: async () => {
      const response = await proj.allProjects(); // або ваш API запит
      setProjects(response); // зберігаємо отримані проекти
    },
    onError: (error: any) => {
      console.error("Помилка завантаження проектів: ", error);
    },
    onSuccess: () => {
      console.log("Проекти завантажено успішно");
    },
  });

  //Add: mutate for delete project
  const { isPending: deleteIsPending, isError: deleteIsError, mutate: deletemutate } = useMutation({
    mutationFn: async (projId: string) => {
      deleteProject(projId); // або ваш API запит
    },
    onError: (error: Error) => {
      console.error("Помилка ??? проектів: ", error.message);
    },
    onSuccess: () => {
      console.log("Проекти ??? успішно");
    },
  });

  useEffect(() => {
    mutate(); // Викликаєте fetchProjects, щоб завантажити проекти
  }, []);

  //Add:
  const deleteProject = (projectId: string) => {
    proj.deleteProject(projectId);
    setProjects(projects.filter((p) => p.projectId !== projectId));
  }

  const [isSubmitted, setIsSubmitted] = useState(false);

  const [sortBy, setSortBy] = useState<"name" | "newest" | "oldest">("newest");
  const [filterRole, setFilterRole] = useState<"" | "owner" | "participant">(
    ""
  );
  const [filterAnchor, setFilterAnchor] = useState<null | HTMLElement>(null);
  const [sortAnchor, setSortAnchor] = useState<null | HTMLElement>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [newProjectName, setNewProjectName] = useState("");

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const sortedProjects = [...projects]
    // .filter((project) => !filterRole || project.role === filterRole)
    .sort((a, b) => {
      if (sortBy === "name") {
        return a.projectName.localeCompare(b.projectName);
      } else if (sortBy === "newest") {
        return (
          new Date(b.date_time).getTime() - new Date(a.date_time).getTime()
        );
      } else {
        return (
          new Date(a.date_time).getTime() - new Date(b.date_time).getTime()
        );
      }
    });

  const handleSortChange = (newSortBy: "name" | "newest" | "oldest") => {
    setSortBy(newSortBy);
    setSortAnchor(null);
  };

  const handleFilterRoleChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFilterRole(event.target.value as "owner" | "participant");
  };

  const clearFilter = () => {
    setFilterRole("");
  };

  const openFilterMenu = (event: MouseEvent<HTMLButtonElement>) => {
    setFilterAnchor(event.currentTarget);
  };

  const closeFilterMenu = () => {
    setFilterAnchor(null);
  };

  const openSortMenu = (event: MouseEvent<HTMLButtonElement>) => {
    setSortAnchor(event.currentTarget);
  };

  const closeSortMenu = () => {
    setSortAnchor(null);
  };

  const openAddProjectDialog = () => setOpenDialog(true);
  const closeAddProjectDialog = () => { setOpenDialog(false); setNewProjectName("") };

  const [isTouched, setIsTouched] = useState(false);

  const handleBlur = () => {
    setIsTouched(true); // Позначаємо, що користувач завершив введення
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
        <Tooltip title="Add project" color="#08031B" arrow>
          <IconButton onClick={openAddProjectDialog}>
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

        {/* Кнопка фільтрації */}
        <Tooltip title="Filter" color="#08031B" arrow>
          <IconButton onClick={openFilterMenu}>
            <FilterListIcon />
          </IconButton>
        </Tooltip>

        {/* Меню фільтрації */}
        <Menu
          sx={{
            fontFamily: "Poppins, sans-serif", // Шрифт
            fontSize: "15px", // Розмір
            fontWeight: 400,
          }}
          anchorEl={filterAnchor}
          open={Boolean(filterAnchor)}
          onClose={closeFilterMenu}
        >
          <MenuItem sx={{ width: 240, justifyContent: "center" }}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Filter</FormLabel>
              <RadioGroup
                value={filterRole}
                onChange={handleFilterRoleChange}
                row
              >
                <FormControlLabel
                  value="owner"
                  control={<Radio />}
                  label="I am owner"
                />
                <FormControlLabel
                  value="participant"
                  control={<Radio />}
                  label="I am member"
                />
              </RadioGroup>
            </FormControl>
            {/* Кнопка очищення фільтра */}
            <Button
              onClick={clearFilter}
              variant="outlined"
              sx={{ color: "#08031B" }}
            >
              Clear
            </Button>
          </MenuItem>
        </Menu>
      </Box>
      {/* проекти */}
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        {isError ? (
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
            {sortedProjects.map((project) => (
              <Grid
                key={project.projectId}
                columns={{ xs: 6, sm: 4, md: 3, lg: 2 }}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <ProjectIcon
                  projectId={project.projectId}
                  ownerId={project.ownerId}
                  projectName={project.projectName}
                  date_time={project.date_time}
                  deletemutate={deletemutate}//Add:
                  defaultSrc="/src/assets/Mediamodifier-Design.svg"
                  hoverSrc="/src/assets/Mediamodifier-Design (1).svg"
                />
              </Grid>
            ))}
          </Grid>
        )}
      </Box>

      {/* Діалогове вікно додавання проекту */}
      <Dialog open={openDialog} onClose={closeAddProjectDialog}>
        <DialogTitle sx={{ color: "#08031B" }}>Add New Project</DialogTitle>
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
            onBlur={handleBlur}
            label="Project Name"
            variant="outlined"
            value={newProjectName}
            onChange={(e) => setNewProjectName(e.target.value)}
            error={!isTouched && isSubmitted}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={closeAddProjectDialog}
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
          <AddProjectButton
            projectName={newProjectName}
            setIsSubmitted={setIsSubmitted}
            isDisabled={!isTouched}
            closeAddProjectDialog={closeAddProjectDialog}
          />
        </DialogActions>
      </Dialog>
    </Box>
  );
};
export default Dashboard;
