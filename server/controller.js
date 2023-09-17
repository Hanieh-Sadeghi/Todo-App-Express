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

function deleteJson (req , res) {
    id = req.params.id;
    data = db.map(data => {
        if(data.id == id) return data
    })
    db.splice(db.indexOf(data) , 1)
    res.json({
      response: "data delete",
      db: db,
    })
}

module.exports = {
  getJson,
  postJson,
  putJson,
  deleteJson,
};
