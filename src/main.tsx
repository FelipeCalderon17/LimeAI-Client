import "reflect-metadata";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "@/config/ioc/IoCRegisterAdapters";
import "@/config/ioc/IoCRegisterUseCases";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
