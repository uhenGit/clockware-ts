"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var path_1 = __importDefault(require("path"));
//import cors from "cors";
var typeorm_1 = require("typeorm");
var City_1 = require("./models/City");
var Master_1 = require("./models/Master");
var Client_1 = require("./models/Client");
var Order_1 = require("./models/Order");
require("reflect-metadata");
var PORT = process.env.PORT || 3001;
// import routes
var cities = require("./routes/city");
var masters = require("./routes/master");
var clients = require("./routes/client");
var orders = require("./routes/order");
var app = express_1.default();
typeorm_1.createConnection({
    type: "postgres",
    host: "localhost",
    username: "postgres",
    password: "postgres",
    database: "clockware",
    //ssl: true,
    synchronize: true,
    logging: false,
    entities: [City_1.City, Master_1.Master, Order_1.Order, Client_1.Client],
})
    .then()
    .catch(function (err) { return console.log("connection error: ", err); });
//app.use(cors());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
/*app.get("/", (req: express.Request, res: express.Response) => {
  res.send("hi");
});*/
app.use(express_1.default.static(path_1.default.resolve(__dirname, "../client/public")));
/*app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/public/index.html"));
});*/
// app.use routes
app.use("/cities", cities);
app.use("/masters", masters);
app.use("/clients", clients);
app.use("/orders", orders);
app.listen(PORT, function () {
    console.log("server starts on port " + PORT);
});
