import axiosInstance from "./axios";


export const addNewProject = async (projectName:string) => {
    try {
        const token = localStorage.getItem("token"); // або використовуйте контекст чи інший механізм

        if (!token) throw new Error("Token not found");

        await axiosInstance.post("/Projects/create_new_project", projectName );
    } catch (error) {
        console.error(error)
        throw error;   
    }
}