import "reflect-metadata";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "@/config/ioc/IoCRegisterAdapters";
import "@/config/ioc/IoCRegisterUseCases";
import { ThemeProvider } from "./presentation/context/ThemeProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="system" storageKey="ai-scribe-theme">
      <App />
    </ThemeProvider>
  </StrictMode>
);
