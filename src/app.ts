import express from "express";
import path from "path";
import * as dotenv from "dotenv";
import { createConnection, DatabaseType } from "typeorm";
import { City } from "./models/City";
import { Master } from "./models/Master";
import { Client } from "./models/Client";
import { Order } from "./models/Order";
require("reflect-metadata");
dotenv.config();

const PORT = process.env.PORT || 3001;

// import routes
const cities = require("./routes/city");
const masters = require("./routes/master");
const clients = require("./routes/client");
const orders = require("./routes/order");

const app: express.Application = express();
//const rootDir = process.env.NODE_ENV === "development" ? "build" : "src";
createConnection({
  type: "postgres",
  host: process.env.TYPEORM_HOST,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  //ssl: true,
  synchronize: true,
  logging: false,
  entities: [City, Client, Master, Order],
})
  .then()
  .catch((err) => console.log("connection error: ", err));
//app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
/*app.get("/", (req: express.Request, res: express.Response) => {
  res.send("hi");
});*/
app.use(express.static(path.resolve(__dirname, "../client/public")));
/*app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/public/index.html"));
});*/
// app.use routes
app.use("/cities", cities);
app.use("/masters", masters);
app.use("/clients", clients);
app.use("/orders", orders);

app.listen(PORT, () => {
  console.log(`server starts on port ${PORT}`);
});
