import axiosInstance from "./axios";

export type Project = {
    projectId: string;
    ownerId: string;
    projectName: string;
    date_time: Date;
}

export type UserResponse = {
    userId: string,
    email: string,
}


export const addNewProject = async (projectName: string) => {
    try {
        return (await axiosInstance.post("/Projects/create_new_project", projectName)).data as Project;
    } catch (error) {
        console.error(error)
        throw error;
    }
}

export const DeleteProject = async (projectId: string) => {
    try {
        await axiosInstance.delete(`/Projects/${projectId}`);
    } catch (error) {
        console.error(error)
        throw error;
    }
}

export const RenameProject = async (projectId: string, projectName: string) => {
    try {
        const RequestRenameProject = { projectId, newName: projectName }
        await axiosInstance.put("/Projects", RequestRenameProject);
    } catch (error) {
        console.error(error)
        throw error;
    }
}

export const getAllUserProject = async (): Promise<Project[]> => {
    try {
        const response = await axiosInstance.get("/Projects/get_by_user");
        return response.data as Project[];

    } catch (error) {
        console.error(error)
        throw error;
    }
}

export const findParticipants = async (projectId: string): Promise<UserResponse[]> => {
    try {
        const response = await axiosInstance.get(`/Users/get_by_project/${projectId}`)
        return response.data as UserResponse[];
    }
    catch (error) {
        console.error(error)
        throw error;
    }
}

export const findUser = async (): Promise<UserResponse[]> => {
    try {
        const response = await axiosInstance.get(`/Users`)
        return response.data as UserResponse[];
    }
    catch (error) {
        console.error(error)
        throw error;
    }
}