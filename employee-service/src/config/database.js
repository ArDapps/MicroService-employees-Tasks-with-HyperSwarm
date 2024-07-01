const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("employeedb", "postgres", "password", {
  host: "postgres",
  dialect: "postgres",
});

module.exports = { sequelize };
