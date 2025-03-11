import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./main.css";
import { RouterProvider } from "react-router-dom";
import AppRouter from "./utils/AppRouter.jsx";
import AppProvider from "./utils/AppContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppProvider>
      <RouterProvider router={AppRouter} />
    </AppProvider>
  </StrictMode>
);
