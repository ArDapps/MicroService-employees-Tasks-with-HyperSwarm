const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("tasksdb", "postgres", "password", {
  host: "postgres",
  dialect: "postgres",
});

module.exports = { sequelize };
