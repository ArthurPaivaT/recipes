const express = require("express");

const port = "1212";
const app = express();

getDev = (req, res, next) => {
  const arthurDev = {
    name: "Arthur",
    mainRole: "Backend Dev",
  };

  res.send(arthurDev);
};

app.get("/getdev", getDev);

app.listen(port, () => {
  console.log("Listening on Port :1212");
});
