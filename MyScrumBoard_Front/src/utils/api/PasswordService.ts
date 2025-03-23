import axiosInstance from "./axios";

export const requestResetPassword = async (email:string) => {
    try {
        await axiosInstance.post("/Password/request_reset_password", email );
    } catch (error) {
        console.error(error)
        throw error;   
    }
}

export const resetPassword = async (newPassword:string) => {
    try {
        await axiosInstance.post("/Password/reset_password" );
    } catch (error) {
        console.error(error)
        throw error;   
    }
}