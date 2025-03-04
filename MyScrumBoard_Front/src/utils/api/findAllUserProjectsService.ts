import axiosInstance from "./axios";

type ProjectResponse = {
  projectId: string;
  ownerId: string;
  projectName: string;
  date_time: Date;
}

export const findAllUserProject = async () :Promise<ProjectResponse[]> => {
    try {
        const token = localStorage.getItem("token"); // або використовуйте контекст чи інший механізм

        if (!token) throw new Error("Token not found");

        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        const response = await axiosInstance.get("/Projects/get_by_user",config);
        return response.data as ProjectResponse[];
    } catch (error) {
        console.error(error)
        throw error;   
    }
}