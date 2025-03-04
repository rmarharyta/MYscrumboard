import React from "react";
import { ProjectContext, ProjectContextType } from "./ProjectContext";

export default function useProject() {
    return React.useContext(ProjectContext) as ProjectContextType;
}