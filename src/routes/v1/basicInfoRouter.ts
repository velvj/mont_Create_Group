import { Router } from "express";
const basicRouter = Router();
import basicInfoController from "../../controllers/basicInfoController";

//basic group routers
basicRouter.post("/createGroup", (req, res, next) =>
  basicInfoController.createGroup(req, res, next)
);
basicRouter.put("/updateGroup/:id", (req, res, next) =>
  basicInfoController.updateGroup(req, res, next)
);

export default basicRouter;
