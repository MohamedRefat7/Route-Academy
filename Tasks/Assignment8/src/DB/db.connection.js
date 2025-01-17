import { Sequelize } from "sequelize";
const sequelize = new Sequelize("Assignment8", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

export default sequelize;
