import { RequestHandler, rest } from "msw";

// Controllers
import authController from "../controllers/auth";

// Constants
import { ENDPOINT } from "../../constants";

// SignIn route
const signIn = rest.post(ENDPOINT.SignIn, authController.signIn);

export default [signIn] as RequestHandler[];
