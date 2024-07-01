const RPC = require("@hyperswarm/rpc");

const rpc = new RPC();
const server = rpc.createServer();

server.listen().then(() => {
  console.log("RPC server is listening");
});

module.exports = { rpc, server };
