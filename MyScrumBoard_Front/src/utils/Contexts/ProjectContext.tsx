import React from "react";
// import { findOwnUserProject } from "../api/findOwnProjects";
// import { findMembershipProject } from "../api/findByMembershipProjects";
import { findAllUserProject } from "../api/findAllUserProjectsService";
import { RenameProject } from "../api/RenameProjectService";
import { addNewProject } from "../api/addNewProjectService";
import { DeleteProject } from "../api/deleteProjectService";

export type Project = {
  projectId: string;
  ownerId: string;
  projectName: string;
  date_time: Date;
};
export type ProjectContextType = {
  allProjects: () => Promise<Project[]>;
  renameProject: (projectId: string, projectName: string) => void;
  addProject: (projectName: string) => void;
  deleteProject: (projectId: string) => void;
};

export const ProjectContext = React.createContext<ProjectContextType | null>(
  null
);

const ProjectProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const allProjects = async (): Promise<Project[]> => {
    try {
      const projects = await findAllUserProject();
      return projects;
    } catch (error: any) {
      console.error("Помилка пошуку: ", error);
      throw new Error(error.response?.data?.message || "Не вдалося знайти");
    }
  };

  const renameProject = async (projectId: string, projectName: string) => {
    try {
      await RenameProject(projectId, projectName);
    } catch (error: any) {
      console.error("Помилка перейменування: ", error);
      throw new Error(
        error.response?.data?.message || "Не вдалось перейменувати"
      );
    }
  };

  const addProject = async (projectName: string) => {
    try {
      await addNewProject(projectName);
    } catch (error: any) {
      console.error("Помилка створення: ", error);
      throw new Error(error.response?.data?.message || "Не вдалось створити");
    }
  };

  const deleteProject = async (projectId: string) => {
    try {
      await DeleteProject(projectId);
    } catch (error: any) {
      console.error("Помилка видалення: ", error);
      throw new Error(error.response?.data?.message || "Не вдалось видалити");
    }
  };

  return (
    <ProjectContext.Provider
      value={{
        allProjects,
        renameProject,
        addProject,
        deleteProject,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export default ProjectProvider;
