const db = require("./model");

function getJson(req, res) {
    res.json(db)
}

module.exports = {
  getJson,
};
