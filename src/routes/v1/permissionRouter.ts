import { Router } from "express";
const permissionRouter = Router();
import permissionController from "../../controllers/permissionController";

//permission routers
permissionRouter.post("/createPermission", (req, res, next) =>
  permissionController.createPermission(req, res, next)
);
permissionRouter.get("/permissionsList", (req, res, next) =>
  permissionController.listOfPermission(req, res, next)
);

export default permissionRouter;
