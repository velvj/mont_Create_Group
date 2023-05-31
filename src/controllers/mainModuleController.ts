import { Request, Response, NextFunction } from "express";
import mainModuleServices from "../services/mainModuleServices";
import { BaseController } from "./baseController";

class MainModuleControllers extends BaseController {
    //create Main Module 
  async createMainMod(req: Request, res: Response, next: NextFunction) {
    try {
      let savedModel = await mainModuleServices.createMainMod(req.body);
      return this.success(
        req,
        res,
        this.status.HTTP_CREATED,
        savedModel,
        "Main Module Created successfully"
      );
    } catch (e) {
      return this.errors(
        req,
        res,
        this.status.HTTP_INTERNAL_SERVER_ERROR,
        this.exceptions.internalServerErr(req, e)
      );
    }
  }
}

export default new MainModuleControllers();
