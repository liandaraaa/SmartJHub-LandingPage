import { Router } from "express";
import healthRouter from "./health";
import summarizeRouter from "./summarize";
import analyzeOilRouter from "./analyzeOil";

const apiRouter = Router();

apiRouter.use(healthRouter);
apiRouter.use(summarizeRouter);
apiRouter.use(analyzeOilRouter);

export default apiRouter;
