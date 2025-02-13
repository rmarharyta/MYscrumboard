import { Box, Grid2 as Grid } from "@mui/material";
import ProjectIcon from "../components/ProjectIcon";
const projects = [
  {
    id: "1",
    name: "Project A",
  },
  {
    id: "2",
    name: "Project B",
  },
  {
    id: "3",
    name: "Project C",
  },
  {
    id: "4",
    name: "Project D",
  },
  {
    id: "5",
    name: "Project E",
  },
  {
    id: "6",
    name: "Project F",
  },
];

function Dashboard() {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
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
        {projects.map((project) => (
          <Grid
            key={project.id}
            columns={{ xs: 6, sm: 4, md: 3, lg: 2 }}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <ProjectIcon
              id={project.id}
              projectName={project.name}
              defaultSrc="/src/assets/folder-svgrepo-com.svg"
              hoverSrc="/src/assets/folder-open-svgrepo-com.svg"
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
export default Dashboard;
