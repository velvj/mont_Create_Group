import { Permission } from "../models/permission";

//permission services
class PermissionServices {
  //create permission
  async createPermission(payload: any) {
    try {
      // console.log("payload from loop >>>",payload)
      let result: any = await Permission.bulkCreate(payload);
      // console.log("result>>of permission>>>",result)
      return result;
    } catch (e) {
      return e;
    }
  }
  //update permission
  async updatePermission(payload: any, id: any) {
    try {
      let result: any = await Permission.update(payload, id);
      console.log("update result>>",result)
      return result;
    } catch (e) {
      return e;
    }
  }

  //list of permission
  async listOfPermission(data?: any) {
    try {
      let result: any = await Permission.findAll({
        ...data,
        raw: true,
        nest: false,
      });
      return result;
    } catch (e) {
      return e;
    }
  }
}

export default new PermissionServices();
