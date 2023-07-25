const router = require("express").Router();
const fs = require("fs");

/**
 * Receives the todos in form of json and stores them in the database/todos.json file
 */
router.post("/upload", (req, res) => {
  const todos = req.body;
  fs.writeFile(
    "./database/todos.json",
    JSON.stringify(todos),
    { encoding: "utf-8" },
    (err) => {
      if (err) res.send(err);
      return;
    }
  );
  res.send("Success");
});

/**
 * Sends todos from the database/todos.json file as json
 */
router.get("/download", (req, res) => {
  fs.readFile("./database/todos.json", { encoding: "utf-8" }, (err, data) => {
    if (err) {
      res.send(err);
      return;
    }

    res.send(data);
  });
});

module.exports = router;
