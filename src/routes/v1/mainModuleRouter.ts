import { Router } from "express";
import mainModuleController from "../../controllers/mainModuleController";
const mainRouter = Router();

//main module routers
mainRouter.post("/createMain", (req, res, next) =>
  mainModuleController.createMainMod(req, res, next)
);

export default mainRouter;
