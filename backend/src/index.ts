const routes = require("./models/routes");
import express from "express";
const mongoose = require("mongoose");
const app = express();

//Connect to mongoDB
mongoose
  .connect("mongodb://admin:admin@it2810-67.idi.ntnu.no/admin", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connection has been made");
  });

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.use("/api", routes);

app.listen(3000, () => {
  console.log("Server has started on http://it2810-67.idi.ntnu.no:3000/api/");
});
//# sourceMappingURL=connection.js.map
