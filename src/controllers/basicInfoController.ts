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
      const groupResult = [];
      let cookingData: any = await req.body.permission_data.map(
        async (e: any) => {
          if (e.products) {
            let product_arr = [];
            await e.products.forEach(async (ele: any) => {
              if (ele.is_all === 0) {
                let common = await commonData(ele);
                product_arr.push({
                  group_id: savedGroup.group_id,
                  ...common,
                });
              } else if (ele.is_all === 1) {
                let selectAllData = await selectedAll(ele);
                product_arr.push({
                  group_id: savedGroup.group_id,
                  ...selectAllData,
                });
              }
            });
            let productList = await permissionServices.createPermission(
              product_arr
            );
            groupResult.push(...productList);
          }
          if (e.customers) {
            let customer_arr = [];
            await e.customers.forEach(async (ele: any) => {
              if (ele.is_all === 0) {
                let common = await commonData(ele);
                customer_arr.push({
                  group_id: savedGroup.group_id,
                  ...common,
                });
              } else if (ele.is_all === 1) {
                let selectAllData = await selectedAll(ele);
                customer_arr.push({
                  group_id: savedGroup.group_id,
                  ...selectAllData,
                });
              }
            });
            let customerList = await permissionServices.createPermission(
              customer_arr
            );
            groupResult.push(...customerList);
          }
          if (e.inventory_sup) {
            let inventory_arr = [];
            await e.inventory_sup.forEach(async (ele: any) => {
              if (ele.is_all === 0) {
                let common = await commonData(ele);
                inventory_arr.push({
                  group_id: savedGroup.group_id,
                  ...common,
                });
              } else if (ele.is_all === 1) {
                let selectAllData = await selectedAll(ele);
                inventory_arr.push({
                  group_id: savedGroup.group_id,
                  ...selectAllData,
                });
              }
            });
            let inventoryList = await permissionServices.createPermission(
              inventory_arr
            );
            groupResult.push(...inventoryList);
            console.log("is_all true check>>", inventoryList);
          }
          if (e.location_management) {
            let location_arr = [];

            await e.location_management.forEach(async (ele: any) => {
              if (ele.is_all === 0) {
                let common = await commonData(ele);
                location_arr.push({
                  group_id: savedGroup.group_id,
                  ...common,
                });
              } else if (ele.is_all === 1) {
                let selectAllData = await selectedAll(ele);
                location_arr.push({
                  group_id: savedGroup.group_id,
                  ...selectAllData,
                });
              }
            });
            let locationList = await permissionServices.createPermission(
              location_arr
            );
            groupResult.push(...locationList);
          }
          return;
        }
      );
      return this.success(
        req,
        res,
        this.status.HTTP_CREATED,
        groupResult,
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
      let { group_name, description } = req.body;
      let { id } = req.params;
      const savedGroup = await basicSerivces.updateBasicInfo(
        {
          group_name,
          description,
        },
        { where: { group_id: id } }
      );
      let cookingData: any = await req.body.permission_data.map(
        async (e: any) => {
          if (e.products) {
            await e.products.forEach(async (ele: any) => {
              let common = await commonData(ele);
              let productList = await permissionServices.updatePermission(
                { ...common },
                {
                  where: {
                    [Op.and]: [
                      { sub_module_id: ele.sub_module_id },
                      { id: ele.id },
                    ],
                  },
                }
              );
            });
          }
          if (e.customers) {
            await e.customers.forEach(async (ele: any) => {
              let common = await commonData(ele);
              let customerList = await permissionServices.updatePermission(
                { ...common },
                {
                  where: {
                    [Op.and]: [
                      { sub_module_id: ele.sub_module_id },
                      { id: ele.id },
                    ],
                  },
                }
              );
            });
          }
          if (e.inventory_sup) {
            await e.inventory_sup.forEach(async (ele: any) => {
              let common = await commonData(ele);
              let inventoryList = await permissionServices.updatePermission(
                { ...common },
                {
                  where: {
                    [Op.and]: [
                      { sub_module_id: ele.sub_module_id },
                      { id: ele.id },
                    ],
                  },
                }
              );
            });
          }
          if (e.location_management) {
            await e.location_management.forEach(async (ele: any) => {
              let common = await commonData(ele);
              let locationList = await permissionServices.updatePermission(
                { ...common },
                {
                  where: {
                    [Op.and]: [
                      { sub_module_id: ele.sub_module_id },
                      { id: ele.id },
                    ],
                  },
                }
              );
            });
          }
          return;
        }
      );
      return this.success(
        req,
        res,
        this.status.HTTP_OK,
        savedGroup,
        "Group Updated successfully"
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
}

export default new BasicInfoController();
