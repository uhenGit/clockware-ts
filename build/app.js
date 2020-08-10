"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var path_1 = __importDefault(require("path"));
var dotenv = __importStar(require("dotenv"));
var typeorm_1 = require("typeorm");
var City_1 = require("./models/City");
var Master_1 = require("./models/Master");
var Client_1 = require("./models/Client");
var Order_1 = require("./models/Order");
require("reflect-metadata");
dotenv.config();
var PORT = process.env.PORT || 3001;
// import routes
var cities = require("./routes/city");
var masters = require("./routes/master");
var clients = require("./routes/client");
var orders = require("./routes/order");
var app = express_1.default();
//const rootDir = process.env.NODE_ENV === "development" ? "build" : "src";
typeorm_1.createConnection({
    type: "postgres",
    host: process.env.TYPEORM_HOST,
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE,
    //ssl: true,
    synchronize: true,
    logging: false,
    entities: [City_1.City, Client_1.Client, Master_1.Master, Order_1.Order],
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
