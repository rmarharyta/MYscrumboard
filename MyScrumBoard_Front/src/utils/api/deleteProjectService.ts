import axiosInstance from "./axios";


export const DeleteProject = async (projectId:string) => {
    try {
        const token = localStorage.getItem("token"); // або використовуйте контекст чи інший механізм

        if (!token) throw new Error("Token not found");

        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            data: JSON.stringify(projectId),
        };

        await axiosInstance.delete("/Projects", config );
    } catch (error) {
        console.error(error)
        throw error;   
    }
}