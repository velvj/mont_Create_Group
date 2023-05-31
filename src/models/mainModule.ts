import { Sequelize, DataTypes, Model } from "sequelize";
import { sequelize } from "../instances/sequelize";
import { SubMod } from "./subModule";

//main Module Model

export interface MainModule {
  main_module_id: number;
  model_name: string;
}

export class MainMod extends Model<MainModule> {}

MainMod.init(
  {
    main_module_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    model_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    tableName: "mains",
    sequelize,
  }
);

//association
MainMod.hasMany(SubMod, { foreignKey: "main_module_id", as: "subModData" });
SubMod.belongsTo(MainMod, { foreignKey: "main_module_id", as: "mainModData" });
