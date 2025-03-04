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
    //Add: for test without SQL
    const projects: Project[] = [
        { projectId: "1", projectName: "Project A", date_time: new Date(), ownerId: "owner" },
        { projectId: "2", projectName: "Project B", date_time: new Date(), ownerId: "participant" },
        { projectId: "3", projectName: "Project C", date_time: new Date(), ownerId: "owner" },
        { projectId: "4", projectName: "Project D", date_time: new Date(), ownerId: "participant" },
        { projectId: "5", projectName: "Project E", date_time: new Date(), ownerId: "owner" },
        { projectId: "6", projectName: "Project F", date_time: new Date(), ownerId: "participant" },
        { projectId: "7", projectName: "Project G", date_time: new Date(), ownerId: "participant" },
        { projectId: "8", projectName: "Project H", date_time: new Date(), ownerId: "participant" },
        { projectId: "9", projectName: "Project I", date_time: new Date(), ownerId: "owner" },
        { projectId: "10", projectName: "Project J", date_time: new Date(), ownerId: "participant" },
        { projectId: "11", projectName: "Project K", date_time: new Date(), ownerId: "participant" },
        { projectId: "12", projectName: "Project L", date_time: new Date(), ownerId: "participant" },
        { projectId: "13", projectName: "Project M", date_time: new Date(), ownerId: "owner" }
    ];

    const allProjects = async (): Promise<Project[]> => {
        try {
            //Change: for test without SQL
            // const projects = await findAllUserProject();
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
        //Add: for test without SQL
        const index = projects.findIndex((p) => { return p.projectId === projectId; })
        projects.splice(index, 1);
        return;

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
