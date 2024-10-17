import { createBrowserRouter } from "react-router-dom";
import App from "../App.jsx";
import OptionsPage from "../pages/OptionsPage.jsx";
import AppWorkingPage from "../pages/AppWorkingPage.jsx";

const AppRouter = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        index: true,
        element: <App />,
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
