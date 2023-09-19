const fs = require("fs");
const db = require("./model");

function getJson(req, res) {
  fs.readFile("todos.txt", "utf8", function (err, data) {
    if (err) {
      console.error(err);
      res.status(500).json({ error: " error server" });
      return;
    }
    
    try {
      const jsonData = JSON.parse(data);
      res.json(jsonData);
    } catch (parseError) {
      console.error(parseError);
      res.status(500).json({ error: "error JSON" });
    }
  });
}

function postJson(req, res) {
  const data = JSON.stringify(req.body);
  fs.appendFile("todos.txt", data, function (err) {
    if (err) throw err;
    console.log("Saved!");
  });

  res.json({
    response: "Todo saved!",
  });
}

function putJson(req, res) {
  db.push(req.body);
  res.json({
    response: "data save",
    db: db,
  });
}

function deleteJson(req, res) {
  id = req.params.id;
  data = db.map((data) => {
    if (data.id == id) return data;
  });
  db.splice(db.indexOf(data), 1);
  res.json({
    response: "data delete",
    db: db,
  });
}

module.exports = {
  getJson,
  postJson,
  putJson,
  deleteJson,
};
