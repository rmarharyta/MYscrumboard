import axiosInstance from "./axios";

export const addParticipant = async (projectId:string, userId:string) => {
    try {
        const collaboration = { projectId, userId }
        const response = await axiosInstance.post("/Collaboration", collaboration);
        return response.data;
    } catch (error) {
        console.error(error)
        throw error;   
    }
}

export const deleteParticipant = async (projectId: string, userId: string) => {
    try {
        const collaboration = { projectId, userId }
        await axiosInstance.delete("/Collaboration", { params: { collaboration } })
    }
    catch (error) {
        console.error(error)
        throw error;
    }
}