import { Sequelize, DataTypes, Model } from "sequelize";
import { sequelize } from "../instances/sequelize";
import { MainMod } from "./mainModule";

//sub Module model

export interface SubModules {
  sub_module_id: number;
  sub_name: string;
  main_module_id: number;
}

export class SubMod extends Model<SubModules> {}
SubMod.init(
  {
    sub_module_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    sub_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    main_module_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    sequelize,
    tableName: "submods",
  }
);

