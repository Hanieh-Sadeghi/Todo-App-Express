const db = require("./model");

function getJson(req, res) {
  res.json(db);
}

function postJson(req, res) {
  db.forEach((data) => {
    if (data.id == req.body.id) {
      data.name = req.body.name;
      data.status = req.body.status;
    }
  });

  
  res.json({
    response: "data update",
    db: db,
  });
}

function putJson(req, res) {
  db.push(req.body);
  res.json({
    response: "data save",
    db: db,
  });
}

module.exports = {
  getJson,
  postJson,
  putJson,
};
