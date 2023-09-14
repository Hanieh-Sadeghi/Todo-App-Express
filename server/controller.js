const { readFile } = require('./utils/readFile');
const db = require('./model')

function staticFiles(req, res) {
  const url = req.url === "/" ? "/index.html" : req.url;

  readFile(url, (error, data) => {
    if (error) {
      res.writeHead(404);
      res.write("Not found error 404");
      return res.end();
    }

    if (req.url.includes("js"))
      res.setHeader("Content-Type", "application/javascript");
    if (req.url.includes("css")) res.setHeader("Content-Type", "text/css");
    if (req.url.includes("html")) res.setHeader("Content-Type", "text/html");
    res.writeHead(200);
    res.write(data);
    res.end();
  });
}

function getJson(req, res) {
  authentication(req, res, (status, user) => {
      if (!status) return redirectToLoginPage(req, res);
      sendJsonData(req, res, { 'status': true, 'todos': user.todos })
  })
}


function postJson(req, res) {
  authentication(req, res, (status, user, data) => {
    if (!status) return redirectToLoginPage(req, res);

    req.on("data", (chunk) => {
      user.todos = JSON.parse(chunk.toString("utf-8"));
      db.write_data(data);
    });
    sendJsonData(req, res, {
      status: true,
      response: "Todos saved successfully!",
    });
  });
}

// function putJson(req, res) {
//   db.push(req.body);
//   res.json({
//     response: "data save",
//     db: db,
//   });
// }

// function deleteJson(req, res) {
//   id = req.params.id;
//   data = db.map((data) => {
//     if (data.id == id) return data;
//   });

//   db.splice(db.indexOf(data), 1);
//   res.json({
//     response: "data delet",
//     db: db,
//   });
// }

module.exports = {
  staticFiles,
  getJson,
  postJson,
  // putJson,
  // deleteJson,
};
