import { createBrowserRouter } from "react-router-dom";

// Routes
import publics from "./publics";
import privates from "./privates";

export const routes = createBrowserRouter([...publics, ...privates]);
