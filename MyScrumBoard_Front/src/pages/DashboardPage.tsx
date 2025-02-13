import {
  Box,
  Grid2 as Grid,
  IconButton,
  Button,
  Divider,
  Checkbox,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  FormControlLabel,
  Tooltip,
  Menu,
  MenuItem,
} from "@mui/material";
import ProjectIcon from "../components/ProjectIcon";
import AddIcon from "@mui/icons-material/Add";
import SortIcon from "@mui/icons-material/Sort";
import FilterListIcon from "@mui/icons-material/FilterList";
import { useState } from "react";

const projects = [
  { id: "1", name: "Project A", createdAt: "2025-01-01", role: "owner" },
  { id: "2", name: "Project B", createdAt: "2025-01-02", role: "participant" },
  { id: "3", name: "Project C", createdAt: "2025-01-03", role: "owner" },
  { id: "4", name: "Project D", createdAt: "2025-01-04", role: "participant" },
  { id: "5", name: "Project E", createdAt: "2025-01-05", role: "owner" },
  { id: "6", name: "Project F", createdAt: "2025-01-06", role: "participant" },
];
function Dashboard() {
  const [sortBy, setSortBy] = useState("name"); // 'name' або 'date'
  const [filterRole, setFilterRole] = useState(""); // Вибір фільтру
  const [filterAnchor, setFilterAnchor] = useState(null); // Для відкриття меню фільтрації
  const [sortAnchor, setSortAnchor] = useState(null); // Для відкриття меню сортування
  const [filteredProjects, setFilteredProjects] = useState(projects);

  // Сортування проектів
  const sortedProjects = [...filteredProjects].sort((a, b) => {
    if (sortBy === "name") {
      // Сортування по алфавіту
      return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
    } else if (sortBy === "newest") {
      // Сортування по новій даті (від найновішої до найстарішої)
      return new Date(b.createdAt) - new Date(a.createdAt);
    } else if (sortBy === "oldest") {
      // Сортування по старій даті (від найстарішої до найновішої)
      return new Date(a.createdAt) - new Date(b.createdAt);
    }
    return 0;
  });

  const handleSortChange = (newSortBy) => {
    setSortBy(newSortBy);
    setSortAnchor(null); // Закриваємо меню після вибору
  };

  const handleFilterRoleChange = (event) => {
    const selectedRole = event.target.value;
    setFilterRole(selectedRole);
    filterProjects(selectedRole);
  };

  const filterProjects = (role) => {
    let newFilteredProjects = projects;
    if (role) {
      newFilteredProjects = projects.filter((project) => project.role === role);
    }
    setFilteredProjects(newFilteredProjects);
  };

  const clearFilter = () => {
    setFilterRole("");
    setFilteredProjects(projects); // Відновлюємо всі проекти
  };

  const openFilterMenu = (event) => {
    setFilterAnchor(event.currentTarget);
  };

  const closeFilterMenu = () => {
    setFilterAnchor(null);
  };

  const openSortMenu = (event) => {
    setSortAnchor(event.currentTarget);
  };

  const closeSortMenu = () => {
    setSortAnchor(null);
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
          <IconButton>
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
            <Button onClick={clearFilter} variant="outlined" color="#08031B">
              Clear
            </Button>
          </MenuItem>
        </Menu>
      </Box>
      {/* проекти */}
      <Box sx={{ display: "flex", justifyContent: "center" }}>
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
              key={project.id}
              columns={{ xs: 6, sm: 4, md: 3, lg: 2 }}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <ProjectIcon
                id={project.id}
                projectName={project.name}
                defaultSrc="/src/assets/Mediamodifier-Design.svg"
                hoverSrc="/src/assets/Mediamodifier-Design (1).svg"
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
export default Dashboard;
