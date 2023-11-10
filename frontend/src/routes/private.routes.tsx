import Response from "../pages/Response";
import Portal from "../pages/Portal";
import Dashboard from "../pages/Portal/Dashboard";
import ListUsers from "../components/ListUsers";
import ActivityDetails from "../pages/Portal/ActivityDetails";
import Reportings from "../pages/Portal/Reportings";

type RouteType = {
  path: string;
  element: JSX.Element;
  children?: {
    path?: string;
    element: JSX.Element;
    index?: boolean;
  }[];
}[];

const routes: RouteType = [
  {
    path: "/portal",
    element: <Portal />,
    children: [
      {
        element: <Dashboard />,
        index: true,
      },
      {
        path: "users",
        element: <ListUsers />,
      },
      {
        path: "activity/:id/details",
        element: <ActivityDetails />,
      },
      {
        path: "reportings",
        element: <Reportings />,
      }
    ],
  },
  {
    path: "/response/:slug",
    element: <Response />,
  },
];

export default routes;
