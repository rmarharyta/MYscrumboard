import axiosInstance from "./axios";

export const requestResetPassword = async (email: string) => {
    try {
        await axiosInstance.post("/Password/request_reset_password", email);
    } catch (error) {
        console.error(error)
        throw error;
    }
}

export const resetPassword = async (newPassword: string, resettoken: string | undefined) => {
    try {
        if (resettoken == undefined) {
            throw new Error("Reset token is undefined");
        }
        var result = await axiosInstance.post("/Password/reset_password", { newPassword, resettoken });
        if (result.status !== 200) {
            throw new Error("Failed to reset password");
        }
        return true;
    } catch (error) {
        console.error(error)
        throw error;
    }
}