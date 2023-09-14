const http = require('http');
const router = require("./utils/router");
const controller = require('./controller');

const server = http.createServer();
const PORT = 3000;

server.on("request", (req, res) => {
  router.static(controller.staticFiles, { req, res });
  router.get('/todos', controller.getJson, { req, res });
  router.post('/todos', controller.postJson, { req, res });

});

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`)
});