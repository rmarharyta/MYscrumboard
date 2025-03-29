import React from "react";
import { login } from "../api/loginService";
import { register } from "../api/registerService";
import axiosInstance from "../api/axios";

export type UserContextType = {
  isAuthenticated: boolean;
  userId: string | null;
  signin: (email: string, password: string) => void;
  signup: (email: string, password: string) => void;
  logout: () => void;
  deleteaccount: () => void;
};

export const UserContext = React.createContext<UserContextType | null>(null);

const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [userId, setUserId] = React.useState(localStorage.getItem("userId"));

  const [isAuthenticated, setIsAuthenticated] = React.useState(
    !!localStorage.getItem("token")
  );

  const signin = async (email: string, password: string) => {
    try {
      const response = await login(email, password);
      setIsAuthenticated(true);
      localStorage.setItem("token", response.token);
      localStorage.setItem("userId", response.returnedUserId);
    } catch (error: any) {
      console.error("Помилка авторизації:", error);
      throw new Error(
        error.response?.data?.message || "Не вдалося авторизуватись"
      );
    }
  };

  const signup = async (email: string, password: string) => {
    try {
      const response = await register(email, password);
      setIsAuthenticated(true);
      localStorage.setItem("token", response.token);
      localStorage.setItem("userId", response.returnedUserId);
    } catch (error: any) {
      console.error("Помилка реєстрації:", error);
      return Promise.reject(error); // Передаємо помилку далі
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserId(null);
    localStorage.clear();
  };

  const deleteaccount = async () => {
    try {
      await axiosInstance.delete("/Users")
      setIsAuthenticated(false);
      setUserId(null);
      localStorage.clear();
    }
    catch {
      
    }
    };

  return (
    <UserContext.Provider
      value={{ isAuthenticated, userId, signin, signup, logout, deleteaccount }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
