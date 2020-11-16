"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const routes = require("./models/routes");
const express_1 = __importDefault(require("express"));
const mongoose = require("mongoose");
const app = express_1.default();
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
//# sourceMappingURL=index.js.map