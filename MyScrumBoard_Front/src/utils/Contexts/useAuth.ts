import React from "react";
import { UserContext, UserContextType } from "./UserContext";

export default function useAuth() {
    return React.useContext(UserContext) as UserContextType;
}