import { Request, Response, NextFunction } from "express";
import { Op } from "sequelize";
import basicSerivces from "../services/basicInfoServices";
import permissionServices from "../services/permissionServices";
import { BaseController } from "./baseController";
import { commonData, selectedAll } from "../utils/commonFunc";

class BasicInfoController extends BaseController {
  //create Group
  async createGroup(req: Request, res: Response, next: NextFunction) {
    try {
      let { group_name, description } = req.body;
      let savedGroup = await basicSerivces.createBasicInfo({
        group_name,
        description,
      });
      let cookingData: any = await req.body.permission_data.map(
        async (ele: any) => {
          return {
            group_id: savedGroup.group_id,
            sub_module_id: ele.sub_module_id,
            is_all: ele.is_all,
            is_create: ele.is_create,
            is_view: ele.is_view,
            is_update: ele.is_update,
            is_delete: ele.is_delete,
            is_download_print: ele.is_download_print,
            is_view_notes: ele.is_view_notes,
          };
        }
      );
      const collectionData = await Promise.all(cookingData);
      const savedPermission = await permissionServices.createPermission(
        collectionData
      );
      return this.success(
        req,
        res,
        this.status.HTTP_CREATED,
        savedPermission,
        "GroupCreated successfully"
      );
    } catch (e) {
      return this.errors(
        req,
        res,
        this.status.HTTP_INTERNAL_SERVER_ERROR,
        this.errors.internalServerErr(req, e)
      );
    }
  }

  //update permission

  async updateGroup(req: Request, res: Response, next: NextFunction) {
    try {
      const { group_name, description } = req.body;
      const { id } = req.params;
      const savedGroup = await basicSerivces.updateBasicInfo(
        {
          group_name,
          description,
        },
        { where: { group_id: id } }
      );
      const cookingData: any = await req.body.permission_data.map(
        async (ele: any) => {
          return {
            group_id: id,
            sub_module_id: ele.sub_module_id,
            is_all: ele.is_all,
            is_create: ele.is_create,
            is_view: ele.is_view,
            is_update: ele.is_update,
            is_delete: ele.is_delete,
            is_download_print: ele.is_download_print,
            is_view_notes: ele.is_view_notes,
          };
        }
      );
      const collectionData = await Promise.all(cookingData);
      const sub_mod_id = await collectionData.map(
        (val: any) => val.sub_module_id
      );
      const sub_id = await req.body.permission_data.map((val: any) => val.id);

      let productList = await permissionServices.updatePermission(
        { ...collectionData[0] },
        {
          where: {
            [Op.and]: [
              { sub_module_id: { [Op.in]: sub_mod_id } },
              { id: { [Op.in]: sub_id } },
              { group_id: id },
            ],
          },
        }
      );
      return this.success(
        req,
        res,
        this.status.HTTP_OK,
        productList,
        "Group Updated successfully"
      );
    } catch (e) {
      console.log(e);
      return this.errors(
        req,
        res,
        this.status.HTTP_INTERNAL_SERVER_ERROR,
        this.errors.internalServerErr(req, e)
      );
    }
  }
}

export default new BasicInfoController();
