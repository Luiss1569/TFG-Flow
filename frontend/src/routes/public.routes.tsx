import Login from "../pages/Login";
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
    path: "*",
    element: <NotFoundPage />,
  },
];

export default routes;
