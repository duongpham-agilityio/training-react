import { SetupWorker, setupWorker } from "msw";

// Handlers
import { handlers } from "./handlers";

export const worker: SetupWorker = setupWorker(...handlers);
