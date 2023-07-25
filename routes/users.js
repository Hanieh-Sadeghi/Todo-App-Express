const express = require("express");
const router = express.Router();
const fs = require("fs");

/* GET users listing. */
router.get("/", (req, res, next) => {
  res.send("Hello There!");
});

module.exports = router;
