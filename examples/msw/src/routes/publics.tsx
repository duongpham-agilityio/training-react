import { Navigate, RouteObject } from "react-router-dom";

// Constants
import { ENDPOINT } from "../constants";

// Components
import Layout from "../components/Layout";
import SignIn from "../pages/SignIn";

export default [
  {
    path: ENDPOINT.Auth,
    Component: Layout,
    children: [
      {
        index: true,
        element: <Navigate to={`${ENDPOINT.SignIn}`} />,
      },

      {
        path: ENDPOINT.SignIn,
        Component: SignIn,
      },
    ],
  },
] as RouteObject[];
