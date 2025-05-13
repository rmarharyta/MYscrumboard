import { AxiosError } from "axios";
import axiosInstance from "./axios";

type LoginResponse = {
    token: string,
    returnedUserId: string,
}

export const login = async (email: string, password: string): Promise<LoginResponse> => {
    try {
        if (!email || !password) throw new Error("email and password are required");
        const user = { email, userPassword: password };
        const response = await axiosInstance.post("login", user);
        return response.data as LoginResponse;
    } catch (error) {
        console.error(error)
        throw error;
    }
}
export const logout = async () => {
    try {
        await axiosInstance.get(`logout`);
    } catch (e) {
        console.error(e);
    }
}

export const getUserDetails = async (): Promise<string> => {
    try {
        const response = await axiosInstance.get(`/me`);
        // console.log(response);
        return response.data.userId as string;
    } catch (e) {
        console.error(e as AxiosError);
        throw e;
    }
}