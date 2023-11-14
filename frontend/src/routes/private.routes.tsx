import Response from "../pages/Response";
import Portal from "../pages/Portal";
import Dashboard from "../pages/Portal/Dashboard";
import ActivityDetails from "../pages/Portal/ActivityDetails";
import { Users } from "../pages/Portal/Users";
import { Institutes } from "../pages/Portal/Institutes";
import Reportings from "../pages/Portal/Reportings";
import Status from "../pages/Portal/Status";

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
        element: <Dashboard/>,
        index: true,
      },
      {
        path: "users",
        element: <Users />,
      },
      {
        path: "activity/:id/details",
        element: <ActivityDetails />,
      },
      {
        path: "institutes",
        element: <Institutes />,
      },
      {
        path: "reportings",
        element: <Reportings />,
      },
      {
        path: "status",
        element: <Status />,
      }
    ],
  },
  {
    path: "/response/:slug",
    element: <Response />,
  },
];

export default routes;
