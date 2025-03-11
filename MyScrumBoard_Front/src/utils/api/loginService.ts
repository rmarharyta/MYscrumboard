import axiosInstance from "./axios";

type LoginResponse = {
    token: string,
    returnedUserId: string,
}

export const login = async (email: string, password: string) :Promise<LoginResponse> => {
    try {
        if (!email || !password) throw new Error("email and password are required");
        const user = {email, userPassword: password };
        const response = await axiosInstance.post("/login", user);
        return response.data as LoginResponse;
    } catch (error) {
        console.error(error)
        throw error;   
    }
}