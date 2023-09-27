import { SetupWorker, setupWorker } from "msw";

// Routes
import { routes } from "./routes";

export const worker: SetupWorker = setupWorker(...routes);
