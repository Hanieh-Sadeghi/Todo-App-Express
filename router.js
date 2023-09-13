const express = require("express");
const router = express.Router();
const controller = require("./controller");

router.get("/" , controller.getJson);
router.post("/" , controller.postJson);
router.put("/" , controller.putJson);


module.exports = router;
