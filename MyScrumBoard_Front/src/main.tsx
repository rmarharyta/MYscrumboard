import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App.tsx";
import UserProvider from "./utils/Contexts/UserContext.tsx";
import ProjectProvider from "./utils/Contexts/ProjectContext.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <UserProvider>
      <ProjectProvider>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </ProjectProvider>
    </UserProvider>
  </StrictMode>
);
