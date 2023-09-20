const express = require("express");
const router = require("./router");
const path = require("path");
const bodyParser= require('body-parser')

const app = express();
const PORT = 3000;

app.use(express.json());
app.use("/v1/api", router);
app.use(express.static(path.join(__dirname ,'../client')))
app.use(bodyParser.urlencoded({extended : false }))
// app.use(bodyParser.json)


app.listen(3000, () => {
  console.log(`listening pn port ${PORT}`);
});

