const express = require("express");
const router = require('./router');

const app = express();
const PORT = 3000;

app.use(express.json())
app.use("/v1/api", router);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
