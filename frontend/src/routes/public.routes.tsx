import Login from "../pages/Login";

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
];

export default routes;
