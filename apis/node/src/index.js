const express = require("express");

const port = "1212";
const app = express();

getUser = (req, res, next) => {
  const arthurDev = {
    name: "Arthur Paiva Tavares",
    mainRole: "Anything Developer",
    gitHub: "github.com/arthurpaivat",
    linkedIn: "linkedin.com/in/arthur-paiva-982405199/",
  };

  res.send(arthurDev);
};

app.get("/getuser", getUser);

app.listen(port, () => {
  console.log("Listening on Port :1212");
});
