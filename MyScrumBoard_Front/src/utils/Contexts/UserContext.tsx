import React, { FC, ReactNode, useEffect } from "react";
import { getUserDetails, login } from "../api/loginService";
import { register } from "../api/registerService";
import useAuth from "./useAuth";

export type UserContextType = {
  userId: string | null;
  signin: (email: string, password: string) => void;
  signup: (email: string, password: string) => void;
  logout: () => void;
};

export const UserContext = React.createContext<UserContextType | undefined>(undefined);

const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children, }) => {
  const [userId, setUserId] = React.useState<string | null>(null);

  useEffect(() => {
    getUserDetails().then((user) => setUserId(user));
  }, []);

  const signin = async (email: string, password: string) => {
    try {
      const response = await login(email, password);
      setUserId(response.returnedUserId);
      console.log(response)
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

  const logout = () => {
    setUserId(null);
    localStorage.clear();
  };

  return (
    <UserContext.Provider
      value={{ userId, signin, signup, logout }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const SingedIn: FC<{ children: ReactNode }> = ({ children }) => {
  const { userId } = useAuth();
  debugger
  if (userId)
    return <>{children}</>;
  else
    return <></>;
};

export const SingedOut: FC<{ children: ReactNode }> = ({ children }) => {
  const { userId } = useAuth();
  if (!userId)
    return <>{children}</>;
  return <></>;
};
export default UserProvider;
