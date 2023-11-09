import Login from "../pages/Login";
import Register from "../pages/Register";
import { NotFoundPage } from "../pages/NotFound";

type RouteType = {
  path: string;
  element: JSX.Element;
  children?: {
    path: string;
    element: JSX.Element;
    index?: boolean;
  }[];
}[];

const routes: RouteType = [
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
];

export default routes;
