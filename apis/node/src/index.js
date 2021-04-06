const express = require("express");

const port = "1212";
const app = express();

//enable cors
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

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
