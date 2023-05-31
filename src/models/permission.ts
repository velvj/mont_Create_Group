import { Sequelize, DataTypes, Model } from "sequelize";
import { sequelize } from "../instances/sequelize";
import { Basic } from "./basicInfo";
import { SubMod } from "./subModule";

//permission model

export interface PermissionData {
  id: number;
  sub_module_id: number;
  group_id: number;
  is_all: boolean;
  is_create: boolean;
  is_view: boolean;
  is_update: boolean;
  is_delete: boolean;
  is_download_print: boolean;
  is_view_notes: boolean;
}

export class Permission extends Model<PermissionData> {}

Permission.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    sub_module_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    group_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    is_all: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    is_create: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    is_view: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    is_update: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    is_delete: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    is_download_print: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    is_view_notes: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    timestamps: true,
    tableName: "permissions",
    sequelize,
  }
);

//association
Permission.hasMany(Basic, {
  sourceKey: "group_id",
  foreignKey: "group_id",
  as: "groupData",
});


Permission.hasMany(SubMod,{
  sourceKey:"sub_module_id",
  foreignKey:"sub_module_id",
  as:'subModData'
})

