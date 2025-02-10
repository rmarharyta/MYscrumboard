import axiosInstance from "./axios";

type RegisterResponse = {
    token: string,
    returnedUserId: string
}

export const register = async (email: string, password: string) :Promise<RegisterResponse> => {
    try {
        if (!email || !password) throw new Error("email and password are required");
        const user = {email, userPassword: password };
        const response = await axiosInstance.post("/registration", user);
        return response.data as RegisterResponse;
    } catch (error) {
        console.error(error)
        throw error;   
    }
}