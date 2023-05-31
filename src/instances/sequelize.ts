import { Sequelize } from "sequelize";
import { dbConfig } from "../config/dbConfig";

//sequelize connection
export const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {...dbConfig,logging:false}
);

export const verifyDBConnection = async () => {
  // Verify Database connection
  return await sequelize.authenticate();
};
