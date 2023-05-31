import { Express } from "express";

import basicInfo from "./v1/basicInfoRouter";
import permissionsInfo from "./v1/permissionRouter";
import mainModule from "./v1/mainModuleRouter";
import subModule from "./v1/subModuleRouter";

const initializeRoutes = (app: Express) => {
  console.log("inside route");
  // Routes
  app.use("/basic", basicInfo);
  app.use("/permission", permissionsInfo);
  app.use("/mainMod", mainModule);
  app.use("/subMod", subModule);
};

export default initializeRoutes;
