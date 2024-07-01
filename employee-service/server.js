const express = require("express");
const employeeRoutes = require("./src/routes/employeeRoutes");
const { sequelize } = require("./src/config/database");
const RPC = require("@hyperswarm/rpc");

const app = express();
const port = 3000;

const rpc = new RPC();

const server = rpc.createServer();
server.listen();

server.respond("checkUser", async (req) => {
  const userId = req.toString();
  const [user] = await sequelize.query(
    'SELECT * FROM "Employees" WHERE id = $1',
    { replacements: [userId], type: sequelize.QueryTypes.SELECT }
  );
  return Boolean(user);
});

app.use(express.json());
app.use("/employees", employeeRoutes);

app.listen(port, async () => {
  await sequelize.sync();
  console.log(`Employee Service listening at http://localhost:${port}`);
});

module.exports = { sequelize, rpc };
