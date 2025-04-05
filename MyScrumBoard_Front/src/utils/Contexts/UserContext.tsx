import React, { FC, ReactNode, useEffect } from "react";
import { getUserDetails, login, logout } from "../api/loginService";
import { register } from "../api/registerService";
import useAuth from "./useAuth";
import axiosInstance from "../api/axios";

export type UserContextType = {
  userId: string | undefined;
  signin: (email: string, password: string) => void;
  signup: (email: string, password: string) => void;
  logout: () => void;
  deleteaccount: () => void;
};

export const UserContext = React.createContext<UserContextType | undefined>(
  undefined
);

const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [userId, setUserId] = React.useState<string>();

  useEffect(() => {
    getUserDetails().then((user) => setUserId(user));
  }, []);

  const signin = async (email: string, password: string) => {
    try {
      const response = await login(email, password);
      setUserId(response.returnedUserId);
      console.log(response);
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
      setUserId(response.returnedUserId);
    } catch (error: any) {
      console.error("Помилка реєстрації:", error);
      return Promise.reject(error); // Передаємо помилку далі
    }
  };

  const signout = () => {
    logout()
      .then(() => {
        setUserId(undefined);
        localStorage.clear();
      })
      .catch((error) => {
        console.error("Помилка виходу:", error);
        throw error;
      });
  };

  const deleteaccount = async () => {
    try {
      await axiosInstance.delete("/Users");
      setUserId(undefined);
      localStorage.clear();
    } catch (e) {
      console.error("Помилка видалення аккаунта:", e);
      throw e;
    }
  };

  return (
    <UserContext.Provider
      value={{ deleteaccount, userId, signin, signup, logout: signout }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const SingedIn: FC<{ children: ReactNode }> = ({ children }) => {
  const { userId } = useAuth();
  if (userId) return <>{children}</>;
  else return <></>;
};

export const SingedOut: FC<{ children: ReactNode }> = ({ children }) => {
  const { userId } = useAuth();
  if (!userId) return <>{children}</>;
  return <></>;
};
export default UserProvider;
