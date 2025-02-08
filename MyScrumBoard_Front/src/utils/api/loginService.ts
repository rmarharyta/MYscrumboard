import { AxiosResponse } from "axios";
import axiosInstance from "./axios";


export const login = async (email: string, password: string) :Promise<AxiosResponse> => {
    try {
        if (!email || !password) throw new Error("email and password are required");
        const user = {email, userPassword: password };
        const response = await axiosInstance.put("login", user);
        return response.data;
    } catch (error) {
        console.error(error)
        throw error;   
    }
}