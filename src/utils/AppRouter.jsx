import { createBrowserRouter } from "react-router-dom";
import OptionsPage from "../pages/OptionsPage.jsx";
import AppWorkingPage from "../pages/AppWorkingPage.jsx";
import Home from "../pages/Home.jsx";

const AppRouter = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "options",
        element: <OptionsPage />,
      },
      {
        path: "ToDo",
        element: <AppWorkingPage />,
      },
    ],
  },
]);
export default AppRouter;
