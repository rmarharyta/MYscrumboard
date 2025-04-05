import axiosInstance from "./axios";

type Scrum = {
  scrumId: string;
  projectId: string;
  scrumName: string;
  date_time: Date;
}
type ScrumResponse={
    scrums: Scrum[];
    ownerId: string;
}


export const addNewScrum = async (projectId: string, scrumName:string) => {
    try {
        const CreateScrum = { projectId, scrumName }
        const response = await axiosInstance.post("/Scrum", CreateScrum);
        return response.data as Scrum;
    } catch (error) {
        console.error(error)
        throw error;   
    }
}

export const DeleteScrum = async (scrumId: string) => {
    try {
        await axiosInstance.delete(`/Scrum/${scrumId}`);
    } catch (error) {
        console.error(error)
        throw error;
    }
}

export const RenameScrum = async (scrumId:string, scrumName:string) => {
    try {
        const RequestRenameScrum = { scrumId, newName: scrumName }
        await axiosInstance.put("/Scrums", RequestRenameScrum);
    } catch (error) {
        console.error(error)
        throw error;   
    }
}

export const findAllProjectScrum = async (projectId:string) :Promise<ScrumResponse> => {
    try {
        
        const response = await axiosInstance.get(`/Scrum/get_by_project/${projectId}`);
        return response.data as ScrumResponse;
    } catch (error) {
        console.error(error)
        throw error;   
    }
}