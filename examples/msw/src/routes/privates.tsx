import { RouteObject } from "react-router-dom";

// Constants
import { ENDPOINT } from "../constants";

// Components
import Layout from "../components/Layout";

export default [
  {
    path: ENDPOINT.Root,
    Component: Layout,
    children: [
      {
        index: true,
        element: <h1>Home</h1>,
      },
    ],
  },
] as RouteObject[];
