import axiosInstance from "./axios";


//Change: use Delete with route insted body
export const DeleteProject = async (projectId: string) => {
    try {
        await axiosInstance.delete(`/Projects/${projectId}`);
    } catch (error) {
        console.error(error)
        throw error;
    }
}