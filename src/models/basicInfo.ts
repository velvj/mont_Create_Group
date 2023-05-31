import { Sequelize, Model, DataTypes } from "sequelize";
import { sequelize } from "../instances/sequelize";

//basic Info Model

export interface BasicInfo {
  group_id: number;
  group_name: string;
  description: string;
  is_active: boolean;
  is_deleted: boolean;
}

export class Basic extends Model<BasicInfo> {}

Basic.init(
  {
    group_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    group_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 1,
    },
    is_deleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    timestamps: true,
    sequelize,
    tableName: "basics",
  }
);
