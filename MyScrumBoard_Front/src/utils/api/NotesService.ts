import axiosInstance from "./axios";

type Notes = {
    noteId: string;
    scrumId: string;
    noteValue: string;
    position: number;
    colorId: number;
}


export const addNewNote = async (scrumId: string, noteValue: string, position: number, colorId: number) => {
    try {
        const CreateNotes = { scrumId, noteValue, position, colorId }
        // console.log(CreateNotes);
        const response = await axiosInstance.post("/Notes", CreateNotes);
        return response.data as Notes;
    } catch (error) {
        console.error(error)
        throw error;
    }
}

export const DeleteNote = async (noteId: string) => {
    try {
        await axiosInstance.delete(`/Notes/${noteId}`);
    } catch (error) {
        console.error(error)
        throw error;
    }
}

export const ChangeNote = async (noteId: string, noteValue: string, position: number, colorId: number) => {
    try {
        const ChangeNote = { noteId, noteValue, position, colorId }
        await axiosInstance.put("/Notes/change_note", ChangeNote);
    } catch (error) {
        console.error(error)
        throw error;
    }
}

export const ChangeNoteStatus = async (noteId: string, position: number) => {
    try {
        const ChangeStatusNote = { noteId, position }
        await axiosInstance.put("/Notes/change_position", ChangeStatusNote);
    } catch (error) {
        console.error(error)
        throw error;
    }
}

export const ChangeNoteColor = async (noteId: string, colorId: number) => {
    try {
        const ChangeColorNote = { noteId, colorId }
        await axiosInstance.put("/Notes/change_color", ChangeColorNote);
    } catch (error) {
        console.error(error)
        throw error;
    }
}

export const findAllScrumNotes = async (scrumId: string): Promise<Notes[]> => {
    try {
        const response = await axiosInstance.get(`/Notes/get_by_scrum/${scrumId}`);
        return response.data as Notes[];

    } catch (error) {
        console.error(error)
        throw error;
    }
}
