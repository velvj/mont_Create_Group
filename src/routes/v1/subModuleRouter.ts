import { Router } from "express";
import subModuleController from "../../controllers/subModuleController";
const subModRouter = Router();

//sub Module routers
subModRouter.post("/createSub", (req, res, next) =>
  subModuleController.createSubMod(req, res, next)
);
subModRouter.get("/listSubMod", (req, res, next) =>
  subModuleController.listOfSubMod(req, res, next)
);

export default subModRouter;
