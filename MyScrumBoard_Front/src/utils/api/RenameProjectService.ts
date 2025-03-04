import axiosInstance from "./axios";

export const RenameProject = async (projectId:string, projectName:string) => {
    try {
        const token = localStorage.getItem("token"); // або використовуйте контекст чи інший механізм

        if (!token) throw new Error("Token not found");
        const RequestRenameProject = { projectId, newName: projectName }
        await axiosInstance.put("/Projects", RequestRenameProject);
    } catch (error) {
        console.error(error)
        throw error;   
    }
}