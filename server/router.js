const express = require("express");
const router = express.Router();
const controller = require('./controller')


router.get("/", controller.getJson ); 
router.post("/", controller.postJson ); 
router.put("/", controller.putJson ); 
router.delete("/:id", controller.deleteJson ); 
router.post('/signup', controller.signup)


module.exports = router;
