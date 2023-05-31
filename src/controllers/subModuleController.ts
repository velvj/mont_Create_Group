import { Request, Response, NextFunction } from "express";
import subModuleServices from "../services/subModuleServices";
import { BaseController } from "./baseController";
import { MainMod } from "../models/mainModule";
import { SubMod } from "../models/subModule";

class SubModuleControllers extends BaseController {
    //create sub module
  async createSubMod(req: Request, res: Response, next: NextFunction) {
    try {
      let savedSubMod = await subModuleServices.createSubMod(req.body);
      return this.success(
        req,
        res,
        this.status.HTTP_CREATED,
        savedSubMod,
        "subModule Created Successfully"
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

  //list of subModules
  async listOfSubMod(req:Request,res:Response,next:NextFunction){
    try{
        let data = await subModuleServices.listOfSubMod();
    
          return this.success(
            req,
            res,
            this.status.HTTP_OK,
            data,
            "List of permission Details successfully viewed"
          );
    }catch(e){

    }
  }
}

export default new SubModuleControllers();
