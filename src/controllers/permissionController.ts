import { Request, Response, NextFunction } from "express";
import { Sequelize, fn, col, Op, and } from "sequelize";
import { BaseController } from "./baseController";
import permissionServices from "../services/permissionServices";
import { Basic } from "../models/basicInfo";
import { SubMod } from "../models/subModule";
import { MainMod } from "../models/mainModule";

class permissionController extends BaseController {
  //create Permission
  async createPermission(req: Request, res: Response, next: NextFunction) {
    try {
      let savedPermission = await permissionServices.createPermission(req.body);
      return this.success(
        req,
        res,
        this.status.HTTP_CREATED,
        savedPermission,
        "Permission Created successfully "
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

  //list Of permissions
  async listOfPermission(req: Request, res: Response, next: NextFunction) {
    try {
      let data = await permissionServices.listOfPermission({
        include: [
          {
            model: Basic,
            as: "groupData",
            attributes: [
              "group_name",
              "description",
              "is_active",
              "is_deleted",
            ],
          },
          {
            model: SubMod,
            as: "subModData",
            attributes: ["sub_module_id", "sub_name", "main_module_id"],
            include: [
              {
                model: MainMod,
                as: "mainModData",
                attributes: { exclude: ["createdAt", "updatedAt"] },
              },
            ],
          },
        ],
        where: {
          [Op.and]: [
            {
              [Op.or]: [
                { is_create: { [Op.eq]: 1 } },
                { is_view: { [Op.eq]: 1 } },
                { is_delete: { [Op.eq]: 1 } },
                { is_update: { [Op.eq]: 1 } },
                { is_all: { [Op.eq]: 1 } },
                { is_download_print: { [Op.eq]: 1 } },
                { is_view_notes: { [Op.eq]: 1 } },
              ],
            },
            { group_id: req.body.group_id },
          ],
        },
      });

      return this.success(
        req,
        res,
        this.status.HTTP_OK,
        data,
        "List of permission Details successfully viewed"
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

export default new permissionController();
